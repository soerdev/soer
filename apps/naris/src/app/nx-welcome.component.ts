import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MixedBusService } from '@soer/mixed-bus';

@Component({
  selector: 'soer-nx-welcome',
  template: `
    <html>
    <head><title>Welcome naris</title></head>
    <body>
      <h1>Welcome naris</h1>
    </body>
    </html>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  constructor(public mixedBus: MixedBusService) {}
}
