import { Request, Response } from "express";

export const create = async (req: Request, res: Response): Promise<void> => {
      res.send(req.file);
};