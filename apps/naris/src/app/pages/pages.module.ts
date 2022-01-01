import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from '../icons-provider.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { StreamsComponent } from './modules/streams/streams.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { DemoNgZorroAntdModule } from './demo.module';
import { RoadmapComponent } from './modules/roadmap/roadmap.component';
import { DumbModule } from './dumb/dumb.module';
import { ComposeVideoPlayerComponent } from './modules/compose-video-player/compose-video-player.component';
import { QuestionsModule } from './modules/questions/questions.module';
import { TargetsModule } from './modules/targets/targets.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AbstracteModule } from './modules/abstracte/abstracte.module';
import { FilesListComponent } from './components/files-list/files-list.component';
import { RouterComposeModule } from './router-compose/router-compose.module';
import { SoerComponentsModule } from './soer-components/soer-components.module';

@NgModule({
  imports: [
    CommonModule,
    DumbModule,
    PagesRoutingModule,
    FormsModule,
    IconsProviderModule,
    DemoNgZorroAntdModule,
    YouTubePlayerModule,
    QuestionsModule,
    NzModalModule,
    TargetsModule,
    AbstracteModule
  ],
  declarations: [
    DefaultComponent,
    StreamsComponent,
    OverviewComponent,
    RoadmapComponent,
    ComposeVideoPlayerComponent,
    FilesListComponent
  ],
  exports: [
    RouterComposeModule
  ]
})
export class PagesModule { }
