import {
  IProject,
  Project,
} from '../models/project.model';

export const createProjectService = async(data:Partial<IProject>,userId:string)=>{
     const project = new Project({
    ...data,
    createdBy: userId,
  });
  return await project.save();
}