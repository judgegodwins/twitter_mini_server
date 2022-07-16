import { omit } from "lodash";
import { ForeignKey } from "sequelize/types";
import { User } from ".";
import { Init, Models } from "../../types/db";
import { genericFields, GenericModelWithoutId } from "./generic";

export default class Follow extends GenericModelWithoutId<Follow> {
  declare ownerId: ForeignKey<User["id"]>;
  declare followerId: ForeignKey<User["id"]>;
}

export const init: Init = (sequelize) => {
  Follow.init(omit(genericFields, ["id"]), { sequelize, tableName: "follows" });
  return Follow;
};
