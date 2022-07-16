import { Sequelize, Model, ModelStatic } from "sequelize/types";

export type ModelType = ModelStatic<Model> & { associate: (models: Models) => any };

export interface Models {
  [key: string]: ModelType;
}

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  models: Models;
}

export type Init = (sequelize: Sequelize) => ModelStatic<Model>;