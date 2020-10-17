import express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Movie } from "./db/models/Movie.model";

// create and setup express app
const app = express();
app.use(express.json());

// default route
app.get("/", (req: Request, res: Response) => res.send("Hello!"));

createConnection().then((connection) => {
  // routes for resources in DB
  app.post("/movies", async (req: Request, res: Response) => {
    const movie = new Movie();
    movie.title = req.body.title;
    movie.plot_summary = req.body.plot_summary;
    movie.duration = req.body.duration;
    await movie.save();
    res.send(movie);
  });
  app.get("/movies", async (req: Request, res: Response) => {
    const movies = await Movie.find();
    res.send(movies);
  });
  app.get("/movies/:id", async (req: Request, res: Response) => {
    const movie = await Movie.findOne(req.params.id);
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  });
  app.put("/movies/:id", async (req: Request, res: Response) => {
    const movie = await Movie.findOne(req.params.id);
    if (movie) {
      await Movie.merge(movie, req.body);
      await movie.save();
      res.send(movie);
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  });
  app.delete("/movies/:id", async (req: Request, res: Response) => {
    const movie = await Movie.findOne(req.params.id);
    if (movie) {
      await movie.remove();
      res.send({ message: "Movie deleted" });
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  });
});

export { app };
