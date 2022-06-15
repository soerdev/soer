import { TestBed } from '@angular/core/testing';
import { ANY_SERVICE, MixedBusService } from '@soer/mixed-bus';
import { SrDTOModule } from '@soer/sr-dto';
import { WatchVideoEvent } from './events/watch-video.event';

import { PersonalActivity, PersonalActivityService } from './personal-activity.service';

describe('PersonalActivityService', () => {
  let personalActivityService: PersonalActivityService;
  const bus$ = new MixedBusService();

  const fakePersonalActivity: PersonalActivity = {
    watched: {
      videos: [{videoId: 'some_vimeo_id'}, {videoId: 'some_youtube_id'}]
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SrDTOModule],
      providers: [
        {provide: MixedBusService, useValue: bus$},
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


  it('should recive WatchVideoEvent and save only uniq values', () => {
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[0]));
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[1]));
    bus$.publish(new WatchVideoEvent(ANY_SERVICE, fakePersonalActivity.watched.videos[1]));
    expect(personalActivityService.getWatchedVideos()).toMatchObject(fakePersonalActivity.watched.videos);
  });

  
});
