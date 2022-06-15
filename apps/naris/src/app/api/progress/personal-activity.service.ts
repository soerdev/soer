import { Inject, Injectable } from '@angular/core';
import { BusEmitter, isBusMessage, MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, CommandRead, CommandUpdate, DataStoreService, DtoPack, OK, StoreCrudService } from '@soer/sr-dto';
import { Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from '../json.dto.helpers';
import { WatchVideoEvent } from './events/watch-video.event';

export interface VideoIdModel {
  videoId: string;
}
export interface PersonalActivity {
  id?: string;
  watched: {
    videos: VideoIdModel[];
  };
}


const EMPTY_ACTIVITY: PersonalActivity = {
  watched: {
    videos: []
  }
}
@Injectable({
  providedIn: 'root'
})
export class PersonalActivityService {
  private activity: PersonalActivity;

  public activity$: Observable<DtoPack<PersonalActivity>>;

  constructor(public store$: DataStoreService, public bus$: MixedBusService, @Inject('activity') private activityId: BusEmitter) { 
    this.activity =  EMPTY_ACTIVITY;


    this.activity$ = parseJsonDTOPack<PersonalActivity>(this.store$.of(this.activityId), 'activity');
    this.activity$.subscribe(data => {
      if (data.status === OK) {
        if (data.items.length === 0) {
          this.updateRemoteState(EMPTY_ACTIVITY);
        } else {
          this.activity = data.items[0];
        }
      }
    });

    bus$.publish(new CommandRead(activityId, {}, {aid: 'personal'}));

    bus$.of(WatchVideoEvent).subscribe(watchVideoEvent => {
      if (isBusMessage(watchVideoEvent)) {
        const activity = JSON.parse(JSON.stringify(this.activity));
        this.updateRemoteState(
          this.watchVideo(watchVideoEvent.payload.videoId, activity)
        );
      }
    });
  }

  private updateRemoteState(activity: PersonalActivity): void {
    if (activity.id) {
      this.bus$.publish(
        new CommandUpdate(
          this.activityId,
          {...convertToJsonDTO(activity, ['id']), id: activity.id},
          {aid: activity.id}
        )
      );
    } else {
      this.bus$.publish(
        new CommandCreate(
          this.activityId,
          convertToJsonDTO(activity, ['id']),
          {aid: 'new'}
        )
      );

    }
  }
  public watchVideo(id: string, activity: PersonalActivity): PersonalActivity {
    if (!activity.watched.videos.find(item => item.videoId === id)) {
      activity.watched.videos.push({videoId: id});
    }
    
    return activity;
  }

  public getWatchedVideos(): VideoIdModel[] {
    return this.activity.watched.videos;
  }
}
