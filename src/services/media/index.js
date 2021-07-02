import express from "express";
import fs from "fs-extra";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

import { getMedia, writeMedia } from "../../lib/fs-tools.js";
import { checkMediaSchema, checkValidatonResult } from "./validation.js";

const mediaRouter = express.Router();

// GET- all
mediaRouter.get("/", async (req, res) => {
  const mediaContent = await getMedia();
  res.send(mediaContent);
});

// get-single
mediaRouter.get("/:id", async (req, res, next) => {
  try {
    const mediaContent = await getMedia();
    const singleMediaContent = mediaContent.find((m) => m.id === req.params.id);
    if (singleMediaContent) {
      res.status(200).send(singleMediaContent);
    } else {
      const error = new Error("No content found");
      error.status = 204;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// POST - create
mediaRouter.post(
  "/",
  checkMediaSchema,
  checkValidatonResult,
  async (req, res, next) => {
    try {
      const newMedia = { ...req.body, imdbID: uniqid() };
      const content = await getMedia();
      content.push(newMedia);
      await writeMedia(content);
      res.status(201).send({ _id: newMedia.imdbID });
    } catch (error) {
      next(error);
    }
  }
);

// PUT - edit
mediaRouter.put(
  "/:id",
  checkMediaSchema,
  checkValidatonResult,
  async (req, res, next) => {
    try {
      const content = await getMedia();

      const remainingContent = content.filter(
        (item) => item.imdbID !== req.params.id
      );
      const updatedMedia = { ...req.body, imdbID: req.params.id };
      remainingContent.push(updatedMedia);
      await writeMedia(remainingContent);
      res.send(updatedMedia);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE
mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    const Content = await getMedia();
    const remainingContent = Content.filter(
      (item) => item.imdbID !== req.params.id
    );
    await writeMedia(remainingContent);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
