import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IconsProviderModule } from "../../icons-provider.module";
import { DefaultComponent } from "./default/default.component";
import { DemoNgZorroAntdModule } from "./demo.module";

@NgModule({
  imports: [
    CommonModule,
    DemoNgZorroAntdModule,
    FormsModule,
    RouterModule,
    IconsProviderModule
/*    DumbModule,
    PagesRoutingModule,
    FormsModule,
    
    DemoNgZorroAntdModule,
    QuestionsModule,
    NzModalModule,
    TargetsModule,
    AbstracteModule*/
  ],
  declarations: [
    DefaultComponent
  ],
  exports: [
   // RouterComposeModule
  ]
})
export class PagesModule { }
