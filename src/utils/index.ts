import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import { BadRequestError } from "../core/ApiError";

export * from './core';
export * from './pagination';

export const bcryptHash = (data: string) => {
  return bcrypt.hash(data, 12);
}

export const validateCloudinaryPublicIds = (ids: string[]) => {
  return Promise.all(
    ids.map((imgId) => cloudinary.api.resource(imgId))
  ).catch((e) => {
    throw new BadRequestError(e.error.message);
  });
}