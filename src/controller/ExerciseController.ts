import { AppDataSource } from "../data-source";

import { Exercise } from "../entity/Exercise";
import { Request, Response } from "express";

const repository = AppDataSource.getRepository(Exercise);

export const createExercise = async (request: Request, response: Response) => {
  const { category, km, date } = request.body;

  const exercise = new Exercise();
  exercise.category = category;
  exercise.km = km;
  exercise.date = date;
  exercise.user = request.user;

  const createdExercise = await repository.save(exercise);

  return response.json(createdExercise);
};
