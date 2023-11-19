import { AppDataSource } from "../data-source";

import { User } from "../entity/User";
import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";

const repository = AppDataSource.getRepository(User);

export const createUser = async (request: Request, response: Response) => {
  const { email, name, password } = request.body;
  const user = new User();
  user.email = email;
  user.name = name;
  user.password = await hash(password, 10);

  const createdUser = await repository.save(user);

  return response.json({
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
  });
};

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await repository.findOneBy({ email: email });

  if (!user || !(await compare(password, user.password))) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const token = sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return response.json({ token: token });
};

export const me = async (request: Request, response: Response) => {
  const userData = request.user;

  const user = await repository.findOneBy({ id: userData.id });

  return response.json({ id: user.id, email: user.email, name: user.name });
};

export const exercises = async (request: Request, response: Response) => {
  const userData = request.user;

  const user = await repository.findOne({
    where: { id: userData.id },
    relations: ["exercises"],
  });

  const exercises = user.exercises;

  return response.json(exercises);
};
