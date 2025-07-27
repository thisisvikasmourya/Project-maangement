import { Response } from 'express';

import { AuthenticatedRequest } from '../../types/express';
import { createProjectService } from '../services/project.service';
import { projectSchema } from '../validations/project.validation';

export const createProject = async (req:AuthenticatedRequest, res: Response) => {
    const userId =  req.user?.id
    console.log(req.body)
    console.log(req?.user)
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
