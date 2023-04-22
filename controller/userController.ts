import { Request, Response } from "express";
import { userEntity } from "../model/userEntity";
import bcrypt from "bcrypt";
import amqp from "amqplib/callback_api";
import jwt from "jsonwebtoken";

const url = "amqp://guest:guest@localhost:5672";

const exchanger = (path: string, data: string) => {
  amqp.connect(url, (err: Error, connection: amqp.Connection) => {
    if (err) {
      throw err;
    } else {
      connection.createChannel((err: Error, channel: amqp.Channel) => {
        if (err) {
          throw err;
        } else {
          channel.assertQueue(path, { durable: false });
          channel.sendToQueue(path, Buffer.from(data));

          // channel.consume("AuthUser", Buffer.from(JSON.stringify(data)))
        }
      });
    }
  });
};

const newX = (queue: string, payload: string) => {
  amqp.connect("", (err: Error, connection: amqp.Connection) => {
    if (err) {
      throw err;
    } else {
      connection.createChannel((err: Error, channel: amqp.Channel) => {
        if (err) {
          throw err;
        } else {
          channel.assertQueue(queue, { durable: false });

          channel.sendToQueue(queue, Buffer.from(payload));
        }
      });
    }
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hahsed = await bcrypt.hash(password, salt);

    const task = await userEntity.create({ email, password: hahsed }).save();

    res.status(201).json({
      message: "created",
      data: task,
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewUsers = async (req: Request, res: Response) => {
  try {
    const task = await userEntity.find();

    res.status(200).json({
      message: "created",
      data: task,
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await userEntity.findOne({ where: { id } });

    res.status(200).json({
      message: "created",
      data: task,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await userEntity.findOne({ where: { id } });

    const token = jwt.sign(
      {
        id: task.id,
        email: task.email,
        password: task.password,
        verified: true,
      },
      "This is THE SectRE",
      // { expiresIn: "5min" },
    );

    const user = await userEntity.merge(task, { verified: true, token }).save();

    exchanger("AuthUser24", token);

    res.status(200).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const user = await userEntity.findOne({ where: { email } });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        verified: user.verified,
      },
      "This is THE SectRE",
      { expiresIn: "15s" },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        verified: user.verified,
      },
      "veriedRefreshedUser",
      { expiresIn: "2m" },
    );
    // exchanger("AuthUser24", token);

    res.status(200).json({
      message: "signin ",
      data: { user, token, refreshToken },
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshUserToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { refresh } = req.body;

    // const user = await userEntity.findOne();

    const newToken = jwt.verify(
      refresh,
      "veriedRefreshedUser",
      (err: Error, payload: jwt.JwtPayload) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.json({
              message: "jwt expired",
            });
          } else {
            throw err;
          }
        } else {
          const token = jwt.sign(
            {
              id: payload.id,
              email: payload.email,
              password: payload.password,
              verified: payload.verified,
            },
            "This is THE SectRE",
            { expiresIn: "25s" },
          );
          const refreshToken = req.body.refresh;

          res.status(200).json({
            message: "signin ",
            data: { token, refreshToken },
          });
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};



