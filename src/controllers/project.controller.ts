import {
  Request,
  Response,
} from 'express';

import { AuthenticatedRequest } from '../../types/express';
import { Project } from '../models/project.model';
import {
  createProjectService,
  deleteProjectService,
  getProjectsList,
  updateProjectSerivce,
} from '../services/project.service';
import { projectSchema } from '../validations/project.validation';

export const createProject = async (req:AuthenticatedRequest, res: Response) => {
    const userId =  req.user?.id

    const validated = projectSchema.parse(req.body);
    try {
        
    const project = await createProjectService(validated,userId!);
    return res
      .status(201)
      .json({
        success: true,
        message: "Project created successfully ",
        data: project,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Something went wrong", data: "" });
  }
};

export const projectLists = async (_req: Request, res: Response) => {
  try {
    const project = await getProjectsList();
    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};


export const updateProject = async(req:Request,res:Response)=>{
      const projectId = req.params.id
      const validated = projectSchema.parse(req.body);
  try {
    if(!projectId){
      throw new Error("Project not found")
    }
      const updatedProject = await updateProjectSerivce(projectId,validated)
       return res.status(200).json({
      success: true,
      message: "Projects updated successfully",
      data: updatedProject,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}


export const deleteProject = async(req:Request,res:Response)=>{
      const projectId = req.params.id
  try {
    if(!projectId){
      throw new Error("Project not found")
    }
    const findProjectId = await Project.findById(projectId)
    if(!findProjectId){
      throw new Error("Project not found")
    }
      const updatedProject = await deleteProjectService(projectId)
       return res.status(200).json({
      success: true,
      message: "Projects deleted successfully",
      data: updatedProject,
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}