import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalTarget, RoadmapTask } from '../../../api/targets/target.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'soer-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  target: PersonalTarget = {
    title: '',
    overview: '',
    activity: '',
    tasks: []
  };
  total = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.target = this.route.snapshot.data['target'] || this.target;
    this.target.tasks.forEach(task => task.progress = this.calcProgress(task.children));
    this.total = this.calcProgress(this.target.tasks);
  }

  url(file: any): string {
    return environment.privateAssetsUrl + file;
  }

  private calcProgress(tasks: RoadmapTask[]) {
      if ((tasks ?? []).length > 0) {
        const value = tasks.reduce( (r, v) => ({total: r.total + 100, real: r.real + v.progress}), {total: 0, real: 0});
        return Math.floor(value.real / value.total * 100);
      }
      return 0;
  }



}
