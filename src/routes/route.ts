import { Router } from "express";
import {
  createMovie,
  deleteMoviesById,
  getMovies,
  getMoviesById,
  updateMovie,
} from "../logic";
import { isCreateBodyValid } from "../middlewares/bodyValid";
import { isMovieIdValid } from "../middlewares/movieValid";
import { isMovieNameValid } from "../middlewares/nameMovieValid";

export const moviesRoutes = Router();

moviesRoutes.post("/", isCreateBodyValid, isMovieNameValid, createMovie);
moviesRoutes.get("/", getMovies);
moviesRoutes.get("/:id", isMovieIdValid, getMoviesById);
moviesRoutes.patch("/:id", isMovieIdValid, isMovieNameValid, updateMovie);
moviesRoutes.delete("/:id", isMovieIdValid, deleteMoviesById);