export interface Task{
    title : string,
    description : string,
    createdDate : Date,
    editedDate : Date,
    isCompleted: boolean,
    userId : number,
    id : number,
    dueDate : Date,
    priority : number,
    assignUser: string,
    isEditActive : boolean,
    parentTaskId : number
}