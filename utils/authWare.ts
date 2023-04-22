import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const veriedUser = (req: any, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers.authorization;
    console.log(token);
    if (token) {
      const realToken = token.split(" ")[1];
      jwt.verify(
        realToken,
        "This is THE SectRE",
        (err: Error, payload: any) => {
          if (err) {
            throw err;
          } else {
            req.user = payload;
            next();
          }
        },
      );
    } else {
      res.json({ message: "Token failed", data: Error });
    }
  } catch (error) {
    throw new Error("Token issue");
  }
};

export const veriedRefreshedUser = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.headers.authorization;

  if (token) {
    const realToken = token.split(" ")[1];
    jwt.verify(realToken, "veriedRefreshedUser", (err: Error, payload: any) => {
      if (err) {
        throw err;
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.json({ message: "Token failed" });
  }
};

export const authMid = async (req: any, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];

    jwt.verify(
      token,
      "This is THE SectRE",
      (err: Error, payload: string | jwt.JwtPayload) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.send(err.message);
          }
        } else {
          req.user = payload;
          next();
        }
      },
    );
  } else {
    res.status(404).json({ message: "You don't have right for this..." });
  }
};
