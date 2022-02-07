const constants = require("./constants");

module.exports = {
  validateSort: (req, res, next) => {
    const { sortBy, sortOrder } = req.query;
    if (sortBy) {
      if (
        !sortOrder ||
        !["asc", "desc"].includes(sortOrder) ||
        !constants.movieSortColumns.includes(sortBy)
      ) {
        return res.status(400).send({ message: "Validation error!" });
      }
    }
    next();
  },
  validatePagination: (req, res, next) => {
    const { offset, limit } = req.query;
    if (!limit || isNaN(Number(limit))) {
      return res.status(400).send({ message: "Validation error! (limit)" });
    }
    if (!offset || isNaN(Number(offset))) {
      return res.status(400).send({ message: "Validation error! (offset)" });
    }
    next();
  },
  validateMovie: (req, res, next) => {
    const { body } = req;
    if (
      !body.title ||
      !body.title.length >= 3 ||
      !body.category ||
      !body.date ||
      !constants.movieCategories.includes(body.category)
    ) {
      return res.status(400).send({ message: "Validation error!" });
    }
    next();
  },
  validateUpdateMovie: (req, res, next) => {
    const { body } = req;
    if (body.title && body.title.length < 3) {
      return res.status(400).send({ message: "Validation error! (title)" });
    }
    if (body.category && !constants.movieCategories.includes(body.category)) {
      return res.status(400).send({ message: "Validation error! (category)" });
    }
    if (body.date && isNaN(new Date(body.date))) {
      return res.status(400).send({ message: "Validation error! (date)" });
    }
    next();
  },

  validateId: (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!id || isNaN(Number(id))) {
      return res.status(400).send({ message: "Validation error!" });
    }
    next();
  },

  validateCrewMember: (req, res, next) => {
    const { body } = req;
    console.log(body);
    if (body.name && body.name.length < 5) {
      return res.status(400).send({ message: "Validation error! (name)" });
    }
    if (body.role && !constants.crewMemberRoles.includes(body.role)) {
      return res.status(400).send({ message: "Validation error! (role)" });
    }
    next();
  },

  validateUpdateCrewMember: (req, res, next) => {
    const { body } = req;
    if (body.name && body.name.length < 5) {
      return res.status(400).send({ message: "Validation error! (name)" });
    }
    if (body.role && !constants.crewMemberRoles.includes(body.role)) {
      return res.status(400).send({ message: "Validation error! (role)" });
    }
    next();
  },
};
