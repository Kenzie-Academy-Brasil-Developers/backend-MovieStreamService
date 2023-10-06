import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

export const isMovieIdValid = async (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.id;

  try {
    const queryString = `SELECT * FROM movies WHERE id = $1;`;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [movieId],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rowCount === 0) {
      return res.status(404).json({ message: "Movie not found!" });
    }

    res.locals.movie = queryResult.rows[0];
    return next();
  } catch (error) {
    // Handle database query errors here
    console.error("Error querying the database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};