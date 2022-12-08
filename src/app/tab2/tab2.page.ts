import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public tasksCompleted: string[];
  public idTasksComplete: string[];
  public task: string;

  constructor(private tasksService: TasksService) {
    this.tasksCompleted = this.tasksService.getTasksCompleteReference();
    this.idTasksComplete = this.tasksService.getIdTaskscompleteReference();

    this.tasksService.getTasksCompleted().subscribe( data =>{
      this.tasksCompleted=[];
      this.idTasksComplete=[];
      data.forEach((element:any) => {

        const taskObject = {id:element.payload.doc.id ,...element.payload.doc.data()}

        if (taskObject.name !== null && taskObject.name !==''){
          this.tasksCompleted.push( taskObject.name );
          this.idTasksComplete.push(taskObject.id);
        }

      });
      this.tasksService.setTasksCompleted(this.tasksCompleted);
      this.tasksService.setTasksCompletedId(this.idTasksComplete);
    });

  }

  public removeTaskCompleted(pos: number){
      this.tasksService.removeTaskCompleted(pos);
      this.tasksCompleted = this.tasksService.getTasksCompleteReference();
      this.idTasksComplete = this.tasksService.getIdTaskscompleteReference();
  }

  public addTask(index:number){
    this.tasksService.addTask(this.tasksCompleted[index]);
    this.removeTaskCompleted(index);
  }


}
