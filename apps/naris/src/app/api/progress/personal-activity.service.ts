import { Inject, Injectable } from '@angular/core';
import { BusEmitter, isBusMessage, MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, CommandRead, DataStoreService, DtoPack, OK } from '@soer/sr-dto';
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
          this.activity = this.joinActivityObjects([this.activity, ...data.items]);
      }
    });

    bus$.publish(new CommandRead(activityId, {}, {aid: 'personal'}));

    bus$.of(WatchVideoEvent).subscribe(watchVideoEvent => {
      if (isBusMessage(watchVideoEvent)) {
        this.updateRemoteState(
          this.watchVideo(watchVideoEvent.payload.videoId)
        );
      }
    });
  }
  

  private joinActivityObjects(activities: PersonalActivity[] ): PersonalActivity {
    const onlyNew = (oldVideos: VideoIdModel[], newVideos: VideoIdModel[]): VideoIdModel[] => {
      const patch = newVideos.map(
        video => oldVideos.findIndex(el => el.videoId === video.videoId) >= 0 ? undefined : video
      ).filter(this.notDefined);
      return patch;
    }
    return activities.reduce(
      (prev, cur) => {
        const patch = onlyNew(prev.watched.videos, cur.watched.videos);
        const id = prev.id || cur.id;        
        return {id, watched: {videos: [...prev.watched.videos, ...patch]}};
      }, EMPTY_ACTIVITY);
  }

  private notDefined<VideoIdModel>(value: VideoIdModel | null | undefined): value is VideoIdModel{
    if (value === null || value === undefined) return false;
    const testDummy: VideoIdModel = value;
    return true;
  }
  
  private isEmpty(activity: PersonalActivity): boolean {
    return activity.watched.videos.length === 0;
  }
  private updateRemoteState(activity: PersonalActivity): void {
      if (this.isEmpty(activity)) {
        return;
      }

      this.bus$.publish(
        new CommandCreate(
          this.activityId,
          convertToJsonDTO(activity, ['id']),
          {aid: 'new'}
        )
      );
  }
  public watchVideo(id: string): PersonalActivity {
    const videoId: VideoIdModel = {videoId: id};
    if (this.activity.watched.videos.find(element => element.videoId === videoId.videoId)) {
      return EMPTY_ACTIVITY;
    }
    this.activity.watched.videos.push(videoId);
    return {watched: {videos: [videoId]}};
  }

  public getWatchedVideos(): VideoIdModel[] {
    return this.activity.watched.videos;
  }
}
