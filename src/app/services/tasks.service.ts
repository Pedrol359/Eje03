import { Task } from './../models/task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //Definición de modelo o conexión con la base de datos
  public tasks: string[] = []; //Creación del modelo
  public tasksCompleted: string[] = []; //Creación del modelo
  public idTask: string[] = [];
  public idTasksComplete: string[] = []; 
 
  constructor(private firestore: AngularFirestore) {}

  public getTasks(){
    return this.firestore.collection('Tareas').snapshotChanges();
  }

  public getTasksCompleted(){
    return this.firestore.collection('TareasConcluidas').snapshotChanges()

  }

  public getTasksReference(){
    return this.tasks
  }

  public getTasksCompleteReference(){
    return this.tasksCompleted
  }

  public getIdTasksReference(){
    return this.idTask
  }

  public getIdTaskscompleteReference(){
    return this.idTasksComplete
  }

  public setTasks(tasks: string[]){
    this.tasks = tasks;
  }

  public setTasksId(tasksId: string[]){
    this.idTask = tasksId;
  }

  public setTasksCompleted(tasks: string[]){
    this.tasksCompleted = tasks;
  }
  
  public setTasksCompletedId(taskId: string[]){
    this.idTasksComplete = taskId;
  }

  public addTask(tarea: string){
    const taskObject = {name:tarea}
    const resultado = this.firestore.collection('Tareas').add(taskObject);
    resultado.then(res => {
      this.tasks.push(tarea);
      this.idTask.push(res.id);
    })

    
  }

  public addCompletedTask(i: number){
    const task = this.tasks[i]
    const taskObject = {name:task}
    const resultado = this.firestore.collection('TareasConcluidas').add(taskObject);
    resultado.then(res => {
      this.tasksCompleted.push(task);
      this.idTasksComplete.push(res.id);
    })
    this.removeTask(i);
  }

  public removeTask(index: number){
    this.firestore.collection('Tareas').doc(this.idTask[index]).delete()
    this.tasks.splice(index, 1); //Eliminar elemento de un array splice(index,cuantos elementos a partir del index)
    this.idTask.splice(index, 1);
  }
 
  public removeTaskCompleted(index: number){
    console.log(this.firestore.collection('TareasConcluidas').doc(this.idTasksComplete[index]).delete());
    this.tasksCompleted.splice(index, 1); //Eliminar elemento de un array splice(index,cuantos elementos a partir del index)
    this.idTasksComplete.splice(index, 1); //Eliminar elemento de un array splice(index,cuantos elementos a partir del index)

  }

}





















