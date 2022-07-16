import {
  Model,
  DataTypes,
  NonAttribute,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { Init, Models } from "../../types/db";
import GenericModel, { genericFields } from "./generic";
import Tweet from "./Tweet";

export default class Image extends GenericModel<Image> {
  declare publicId: string;

  declare tweetId: ForeignKey<Tweet["id"]>;
  declare tweet: NonAttribute<Tweet>;

  declare getTweet: BelongsToGetAssociationMixin<Tweet>;

  static associate(models: Models) {
    // define association here

    Image.belongsTo(Tweet, { as: "tweet" });
  }
}

export const init: Init = (sequelize) => {
  Image.init(
    {
      ...genericFields,
      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "images",
    }
  );

  return Image;
};
