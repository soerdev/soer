import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NzModalModule } from "ng-zorro-antd/modal";
import { IconsProviderModule } from "../../icons-provider.module";
import { FilesListComponent } from "./components/files-list/files-list.component";
import { DefaultComponent } from "./default/default.component";
import { DemoNgZorroAntdModule } from "./demo.module";
import { DumbModule } from "./dumb/dumb.module";
import { AbstracteModule } from "./modules/abstracte/abstracte.module";
import { ComposeVideoPlayerComponent } from "./modules/compose-video-player/compose-video-player.component";
import { OverviewComponent } from "./modules/overview/overview.component";
import { QuestionsModule } from "./modules/questions/questions.module";
import { RoadmapComponent } from "./modules/roadmap/roadmap.component";
import { StreamsComponent } from "./modules/streams/streams.component";
import { TargetsModule } from "./modules/targets/targets.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { RouterComposeModule } from "./router-compose/router-compose.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { CertificateModule } from "./modules/certificate/certificate.module";
import { SrDTOModule } from "@soer/sr-dto";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzImageModule } from "ng-zorro-antd/image";

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
    AbstracteModule,
    PaymentModule,
    CertificateModule,
    SrDTOModule
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
