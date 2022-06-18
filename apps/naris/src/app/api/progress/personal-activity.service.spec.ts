import { TestBed } from '@angular/core/testing';
import { ANY_SERVICE, isBusMessage, MixedBusService } from '@soer/mixed-bus';
import { ChangeDataEvent, CommandCreate, DataStoreService, OK, SrDTOModule } from '@soer/sr-dto';
import { WatchVideoEvent } from './events/watch-video.event';

import { PersonalActivity, PersonalActivityService } from './personal-activity.service';

describe('PersonalActivityService', () => {
  let personalActivityService: PersonalActivityService;
  let bus$ = new MixedBusService();
  let store$ = new DataStoreService(bus$);

  const fakePersonalActivity: PersonalActivity = {
    watched: {
      videos: [{videoId: 'some_vimeo_id'}, {videoId: 'some_youtube_id'}]
    }
  }

  beforeEach(() => {
    bus$ = new MixedBusService();
    store$ = new DataStoreService(bus$);
    TestBed.configureTestingModule({ imports: [SrDTOModule],
      providers: [
        {provide: MixedBusService, useValue: bus$},
        {provide: DataStoreService, useValue: store$},
        PersonalActivityService,
        {provide: 'activity', useValue: ANY_SERVICE},
        
      ]
    });
    personalActivityService = TestBed.inject(PersonalActivityService);
  });

  it('should be created', () => {
    expect(personalActivityService).toBeTruthy();
  });

  it('should has bus messages', () => {
    expect(personalActivityService.bus$).toBeDefined();
  });


  it('should recive ChangeDataEvent with full state of activity', () => {
    bus$.publish(
      new ChangeDataEvent(ANY_SERVICE, {status: OK, items:[
        {json: JSON.stringify(fakePersonalActivity)}
      ]})
    );
    expect(personalActivityService.getWatchedVideos()).toMatchObject(fakePersonalActivity.watched.videos);
  });

  
  it('should recive WatchVideoEvent', () => {
    const sub = bus$.of(CommandCreate).subscribe(data => {
      if (isBusMessage(data)){
        bus$.publish(
          new ChangeDataEvent(
              ANY_SERVICE, 
              {
                status: OK, 
                items:[
                  data.payload
                ]
              }
          )
        );
      }
    });
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[0]));
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[1]));
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[1]));
    sub.unsubscribe();
    expect(personalActivityService.getWatchedVideos()).toMatchObject(fakePersonalActivity.watched.videos);
  });
});
