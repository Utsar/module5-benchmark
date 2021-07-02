import express from "express";

const reviewsRouter = express.Router();

// POST Review to media
reviewsRouter.post("/:mediaId", async (req, res, next) => {});

// DELETE Review of media
reviewsRouter.delete("/:mediaId", async (req, res, next) => {});

export default reviewsRouter;
