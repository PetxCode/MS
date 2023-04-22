import { Request, Response } from "express";
import { productEntity } from "../model/productEntity";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price } = req.body;
    const product = await productEntity.create({ title, price }).save();

    res.status(201).json({ message: "Created", data: product });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productEntity.find();

    res.status(201).json({ message: "found", data: product });
  } catch (error) {
    res.json({ message: error });
  }
};
