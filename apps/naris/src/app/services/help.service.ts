import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  public go: any = {};
  constructor() { 
    const wnd = (window as any);
    wnd.help = this;
    this.makeGoto();
  }

  me() {
    console.log(`

      Дополнительные возможности NARIS из консоли:
        - help.me - данная подсказка
        - go.[path] - переход на указанный path
    `)
  }

  private makeGoto(): void {
    const r: Record<string, string> = {
      conspects: '#!/pages/workbook/conspects',
      quiz: '#!/pages/workbook/quiz',
      articles: '#!/pages/workbook/articles'
    };
    Object.keys(r).forEach(key => {
      this.go[key] = () => document.location.href = r[key];
    });
    
  }
}
