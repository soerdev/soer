import { TestBed } from '@angular/core/testing';
import { ANY_SERVICE, MixedBusService } from '@soer/mixed-bus';
import { ChangeDataEvent, DataStoreService, OK, SrDTOModule } from '@soer/sr-dto';

import { PersonalActivity, PersonalActivityService } from './personal-activity.service';

describe('PersonalActivityService', () => {
  let personalActivityService: PersonalActivityService;
  const bus$ = new MixedBusService();
  const store$ = new DataStoreService(bus$);

  const fakePersonalActivity: PersonalActivity = {
    watched: {
      videos: [{videoId: 'some_vimeo_id'}, {videoId: 'some_youtube_id'}]
    }
  }

  beforeEach(() => {
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

  
});
