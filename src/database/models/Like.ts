import { omit } from "lodash";
import {
  ForeignKey,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize";
import { Init, Models } from "../../types/db";
import { genericFields, GenericModelWithoutId } from "./generic";
import { Tweet, User } from ".";

class Like extends GenericModelWithoutId<Like> {
  declare tweetId: ForeignKey<Tweet["id"]>;
  declare userId: ForeignKey<User["id"]>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, string>;

  static associate(models: Models) {
    Like.belongsTo(User, { as: "user" });
  }
}

export const init: Init = (sequelize) => {
  Like.init(omit(genericFields, ["id"]), { sequelize, tableName: "likes" });
  return Like;
};

export default Like;
