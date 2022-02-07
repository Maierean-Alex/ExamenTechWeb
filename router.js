const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Movie = require("./models/Movie");
const CrewMember = require("./models/CrewMember");
const middlewares = require("./middlewares");
const constants = require("./constants");

Movie.hasMany(CrewMember, {
  as: "crewMembers",
  foreignKey: "movie_id",
});

CrewMember.belongsTo(Movie, {
  as: "movie",
  foreignKey: "movie_id",
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get(
  "/movies",
  middlewares.validatePagination,
  middlewares.validateSort,
  async (req, res) => {
    try {
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const { sortBy, sortOrder } = req.query;

      const query = {
        limit,
        offset,
      };
      if (sortBy && sortOrder) {
        query.order = [[sortBy, sortOrder]];
      }

      const movies = await Movie.findAll(query);
      res.send(movies);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get("/movies/categories", (req, res) => {
  try {
    res.send(constants.movieCategories);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/movies/roles", (req, res) => {
  try {
    res.send(constants.crewMemberRoles);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/movies/:id", middlewares.validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({
      where: { id },
      include: [{ model: CrewMember, as: "crewMembers" }],
    });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/movies", middlewares.validateMovie, async (req, res) => {
  try {
    await Movie.create(req.body);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.put(
  "/movies/:id",
  middlewares.validateId,
  middlewares.validateUpdateMovie,
  async (req, res) => {
    try {
      const { id } = req.params;
      await Movie.update(req.body, {
        where: { id },
      });
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.delete("/movies/:id", middlewares.validateId, async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.destroy({ where: { id } });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post(
  "/movies/:id/crewMembers",
  middlewares.validateId,
  middlewares.validateCrewMember,
  async (req, res) => {
    try {
      await CrewMember.create({ ...req.body, movie_id: req.params.id });
      res.status(201).send();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/movies/crewMembers/:id",
  middlewares.validateId,
  middlewares.validateUpdateCrewMember,
  async (req, res) => {
    try {
      const { id } = req.params;
      await CrewMember.update(req.body, {
        where: { id },
      });
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.delete(
  "/movies/crewMembers/:id",
  middlewares.validateId,
  async (req, res) => {
    try {
      const { id } = req.params;
      await CrewMember.destroy({ where: { id } });
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
