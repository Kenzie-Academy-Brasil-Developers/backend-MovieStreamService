import { Request, Response } from "express";
import { defaultQuery } from "./utils/querryDefault";
import { IMovie, TMovieUpdateData } from "./interfaces";

export const createMovie = async (req: Request, res: Response) => {
  const newMovie: Omit<IMovie, "id"> = {
    name: req.body.name,
    category: req.body.category,
    duration: req.body.duration,
    price: req.body.price,
  };

  const data = await defaultQuery(`INSERT INTO movies (%I) VALUES (%L) RETURNING *;`, [
    Object.keys(newMovie),
    Object.values(newMovie),
  ]);

  return res.status(201).json(data.rows[0]);
};

export const getMovies = async (req: Request, res: Response) => {
  if (req.query.category) {
    const data = await defaultQuery(`SELECT * FROM movies WHERE category ILIKE %L;`, [
      req.query.category,
    ]);

    if (data.rows.length > 0) {
      return res.status(200).json(data.rows);
    } else {
      const data = await defaultQuery(`SELECT * FROM movies;`, []);
      return res.status(200).json(data.rows);
    }
  } else {
    const data = await defaultQuery(`SELECT * FROM movies;`, []);
    return res.status(200).json(data.rows);
  }
};

export const getMoviesById = async (req: Request, res: Response) => {
  res.status(200).json(res.locals.movie);
};

export const updateMovie = async (req: Request, res: Response) => {
  let movieUpdate: TMovieUpdateData = {};

  Object.entries(req.body).forEach(([key, value]) => {
    if (key === "name" || key === "category" || key === "duration" || key === "price") {
      if (typeof value === "string" || typeof value === "number") {
        movieUpdate[key] = value;
      }
    }
  });

  const data = await defaultQuery(
    `UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
    [Object.keys(movieUpdate), Object.values(movieUpdate), req.params.id]
  );

  res.status(200).json(data.rows[0]);
};

export const deleteMoviesById = async (req: Request, res: Response) => {
  await defaultQuery(`DELETE FROM movies WHERE id = %L`, [req.params.id]);
  return res.status(204).json();
};