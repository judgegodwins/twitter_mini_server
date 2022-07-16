import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ModelAttributes } from "sequelize";

export const genericFields = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};

export class GenericModelWithoutId <T extends Model> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

class GenericModel<T extends Model> extends GenericModelWithoutId<T> {
  declare id: CreationOptional<string>;
}

export default GenericModel;