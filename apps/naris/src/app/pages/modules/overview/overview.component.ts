import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusEmitter, BusMessage } from '@soer/mixed-bus';
import { DataStoreService, DtoPack } from '@soer/sr-dto';
import { WorkbookModel } from '@soer/sr-editor';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { parseJsonDTOPack } from '../../../api/json.dto.helpers';
import { PersonalActivityService, VideoIdModel } from '../../../api/progress/personal-activity.service';
import { QuestionModel } from '../../../api/questions/question.model';
import { VideoModel } from '../../../api/streams/stream.model';
import { TargetModel } from '../../../api/targets/target.interface';


@Component({
  selector: 'soer-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {

  data;
  workbook$: Observable<DtoPack<WorkbookModel>>;
  question$: Observable<DtoPack<QuestionModel>>;
  target$: Observable<DtoPack<TargetModel>>;
  public metrics: {list$: Observable<any>, [key: string]: any}[];
  constructor(
    private route: ActivatedRoute,
    @Inject('workbooks') private workbooksId: BusEmitter,
    @Inject('targets') private targetsId: BusEmitter,
    @Inject('questions') private questionsId: BusEmitter,
    public personalActivity: PersonalActivityService,
    private store$: DataStoreService
  ) {
    this.data = this.route.snapshot.data;
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbooksId), 'workbooks');
    this.target$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'targets'); 
    this.question$ = this.store$.of(this.questionsId).pipe(map<BusMessage, DtoPack<QuestionModel>>(data => {
      return data.payload;
    })); 

    const videosFlatMap = (videos: VideoModel[]): VideoModel[] => {
      return videos.reduce((acc: VideoModel[], item: VideoModel) => [...acc, ...(item.children || [])], []);
    }

    const countVideosIn = (videos: VideoModel[], watchedVideos: VideoIdModel[]): {items: {length: number}} => {
      const onlyIds = watchedVideos.map(video => video.videoId)
      const onlyWatchedVideos = videos.filter(video => onlyIds.includes(video.vimeo_id || video.youtube_id || ''));
      const length = onlyWatchedVideos.reduce((acc: number, item) => acc + (item.children ? item.children.length : 1), 0)
      return {
        items: {length}
      };
    }
    
    this.metrics = [
      {
        title: 'Цели',
        list$: this.target$,
        icon: 'check-circle',
        url: '#!/pages/targets/list'
      },
      {
        title: 'Конспекты',
        list$: this.workbook$,
        icon: 'solution',
        url: '#!/pages/workbook'
      },
      {
        title: 'Вопросы',
        list$: this.question$,
        icon: 'question',
        url: '#!/pages/qa'
      },
      {
        title: 'Стримы',
        list$: of(countVideosIn(videosFlatMap(this.data['streams']), this.personalActivity.getWatchedVideos())),
        icon: 'play-circle',
        url: '#!/pages/streams'
      },
      {
        title: 'Воркшопы',
        list$: of(countVideosIn(videosFlatMap(this.data['workshops']), this.personalActivity.getWatchedVideos())),
        icon: 'experiment',
        url: '#!/pages/workshops'
      },
      {
        title: 'Книга',
        list$: of({items: {length: '57'}}),
        suffix: '%',
        icon: 'book',
        url: '#!/pages/book'
      },
      {
        title: 'Исходники',
        list$: of({items: {length: '6'}}),
        icon: 'field-binary',
        url: '#!/pages/sources'
      }
    ];

   }
 
}
