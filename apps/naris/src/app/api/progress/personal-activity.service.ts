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

@Injectable({
  providedIn: 'root'
})
export class PersonalActivityService {
  private activity: PersonalActivity;

  public activity$: Observable<DtoPack<PersonalActivity>>;

  constructor(public store$: DataStoreService, public bus$: MixedBusService, @Inject('activity') private activityId: BusEmitter) { 
    this.activity = {
      watched: {
        videos: []
      }
    }


    this.activity$ = parseJsonDTOPack<PersonalActivity>(this.store$.of(this.activityId), 'activity');
    this.activity$.subscribe(data => {
      if (data.status === OK) {
        this.activity = data.items[0];
      }
    });

    bus$.publish(new CommandRead(activityId));

    bus$.of(WatchVideoEvent).subscribe(watchVideoEvent => {
      if (isBusMessage(watchVideoEvent)) {
        this.watchVideo(watchVideoEvent.payload.videoId);
        this.updateRemoteState();
      }
    });
  }

  private updateRemoteState(): void {
    if (this.activity.id) {
      this.bus$.publish(
        new CommandUpdate(
          {...this.activityId, key: {aid: this.activity.id}},
          {...convertToJsonDTO(this.activity, ['id']), id: this.activity.id}
        )
      );

    } else {
      this.bus$.publish(
        new CommandCreate(
          {...this.activityId, key: {aid: 'new'}},
          convertToJsonDTO(this.activity, ['id']),
        )
      );

    }
  }
  public watchVideo(id: string): void {
    if (this.activity.watched.videos.find(item => item.videoId === id)) {
      return;
    }
    this.activity.watched.videos.push({videoId: id});
  }

  public getWatchedVideos(): VideoIdModel[] {
    return this.activity.watched.videos;
  }
}
