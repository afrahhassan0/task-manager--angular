import { Status } from './Status';

export class TaskBrief {
  constructor(
    public id:number,
    public title: string,
    public createdDate: string,
    public status = 0 || 1 || 2 ||3
    ){}
}
