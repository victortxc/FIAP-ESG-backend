import { Router } from "express";
import { createUser, exercises, login, me } from "./controller/UserController";
import { authenticateToken } from "./middleware/authMiddleware";
import { createExercise } from "./controller/ExerciseController";

const routes = Router();

routes.post("/users", createUser);
routes.post("/login", login);
routes.get("/me", authenticateToken, me);
routes.get("/users/exercises", authenticateToken, exercises);

routes.post("/exercises", authenticateToken, createExercise);

export default routes;
