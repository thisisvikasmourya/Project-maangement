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

export const getProjectsList = async () => {
  return await Project.find();
};

export const updateProjectSerivce = async(projecttId:string,data:Partial<IProject>)=>{
  const updated = await Project.findByIdAndUpdate(projecttId,data)
  return updated
}

export const deleteProjectService = async(projecttId:string)=>{
  
  const deleted = await Project.findByIdAndDelete(projecttId)
  return deleted
}