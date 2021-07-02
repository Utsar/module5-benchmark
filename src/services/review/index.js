import express from "express";
import { getReview, writeReview } from "../../lib/fs-tools.js";

const reviewsRouter = express.Router();

// POST - Review to media
reviewsRouter.post("/:id", async (req, res, next) => {
  try {
    const newComment = {
      ...req.body,
      id: uniqid(),
      mediaId: req.params.id,
      createdAt: new Date(),
    };
    const comments = await getReview();
    comments.push(newComment);
    await writeReview(comments);
    res.status(201).send(newComment);
  } catch (error) {
    next(error);
  }
});

// DELETE - Review of media
reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const comments = await getReview();
    const commentsNew = comments.filter((c) => c.id !== req.params.id);
    await writeReview(commentsNew);
    res.status(200).send("Comment deleted successfully!");
  } catch (error) {
    next(error);
  }
});
export default reviewsRouter;
