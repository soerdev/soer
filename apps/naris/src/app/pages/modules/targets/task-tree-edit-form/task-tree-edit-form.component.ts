import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TargetModel } from 'src/app/api/targets/target.interface';

@Component({
  selector: 'app-task-tree-edit-form',
  templateUrl: './task-tree-edit-form.component.html',
  styleUrls: ['./task-tree-edit-form.component.scss']
})
export class TaskTreeEditFormComponent implements OnInit, OnChanges {
  @Input() target: TargetModel;
  @Input() history: {ind: number, title: string}[];

  @Output() readonly save = new EventEmitter<TargetModel>();
  @Output() readonly historyChange = new EventEmitter<{ind: number, title: string}[]>();
  @Output() readonly cancel = new EventEmitter<any>();
  @Output() readonly delete = new EventEmitter<TargetModel>();

  public activeTarget: TargetModel;
  public isEdit = true;
  public isEditTask = false;
  public editTaskByIndex = -1;


  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      this.applyHistory(this.history);
      this.autoEditTask();
  }

  onActiveTask(target: TargetModel, ind: number): void {
    this.isEditTask = true;
    this.history.push({ind, title: target.title});
    this.applyHistory(this.history);
  }

  autoEditTask(): boolean {
    this.activeTarget.tasks?.forEach( (task, index) => {
      if (task.title === '') {
        this.editTaskByIndex = index;
        return true;
      }
    });
    return false;
  }

  onCancelEdit(value): void {
    if (value === '') {
      this.onDeleteTask(this.target, this.editTaskByIndex);
      return;
    }
    this.editTask(-1);
  }

  editTask(ind: number): void {
    this.editTaskByIndex = ind;
  }

  createTask(target: TargetModel): void {
    target.tasks = target.tasks || [];
    target.tasks.push({title: '', overview: '', progress: 0, tasks: []});
    this.save.next(this.target);
  }

  onDeleteTask(target: TargetModel, ind: number): void {
    target.tasks = target.tasks.filter( (_, taskIndex) => taskIndex !== ind);
    this.save.next(this.target);
  }


  truncateHistory(ind: number): void {
    this.history =  this.history.filter((_, i) => i < ind);
    this.historyChange.next(this.history);
    this.applyHistory(this.history);
  }

  private applyHistory(history: {ind: number, title: string}[] = []): void {
    this.activeTarget = this.target;
    history.forEach(item => this.activeTarget = this.activeTarget.tasks[item.ind]);
  }
}
