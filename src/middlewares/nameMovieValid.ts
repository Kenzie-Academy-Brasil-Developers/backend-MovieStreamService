import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

export const isMovieNameValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieName = req.body.name;

  try {
    const queryString = `SELECT EXISTS (SELECT 1 FROM movies WHERE name = $1) AS "exists";`;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [movieName],
    };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rows[0].exists) {
      return res.status(409).json({ message: "Movie name already exists!" });
    }

    return next();
  } catch (error) {
    // Handle database query errors here
    console.error("Error querying the database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};