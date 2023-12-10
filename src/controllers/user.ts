import User, {UserDoc} from "../models/user.model";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser = await User.create(req.body);
      res.send({ newUser });
    } catch (err) {
      res.status(500).send({ message: "An error occured when creating user" });
    }
  };