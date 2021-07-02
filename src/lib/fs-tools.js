import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const mediaJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/media.json"
);
const reviewJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/review.json"
);

export const getMedia = () => readJSON(mediaJSONPath);
export const getReview = () => readJSON(reviewJSONPath);

export const writeMedia = (content) => writeJSON(mediaJSONPath, content);
export const writeReview = (content) => writeJSON(reviewJSONPath, content);
