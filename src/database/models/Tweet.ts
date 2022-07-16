import {
  DataTypes,
  Sequelize,
  ForeignKey,
  NonAttribute,
  BelongsToGetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  Association,
  CreationOptional,
} from "sequelize";
import { Init, Models } from "../../types/db";
import GenericModel, { genericFields } from "./generic";
import { Like, User, Image } from ".";
import { TweetType } from "./enums";

class Tweet extends GenericModel<Tweet> {
  declare content: string;
  declare type: CreationOptional<TweetType>;

  declare userId: ForeignKey<User["id"]>;
  declare user?: NonAttribute<User>;

  declare quotedId?: ForeignKey<Tweet["id"]>;
  declare retweets?: NonAttribute<Tweet[]>;

  declare quoted: NonAttribute<Tweet>;

  declare parentId?: ForeignKey<Tweet["id"]>;
  declare parent?: NonAttribute<Tweet>;

  comments?: NonAttribute<Tweet[]>;
  images?: NonAttribute<Image[]>;

  declare likes: NonAttribute<Like[]>;
  declare getLikes: HasManyGetAssociationsMixin<Like>;
  declare addLike: HasManyAddAssociationMixin<Like, string>;
  declare countLikes: HasManyCountAssociationsMixin;

  declare getUser: BelongsToGetAssociationMixin<User>;

  declare getQuoted: BelongsToGetAssociationMixin<Tweet>;

  declare getParent: BelongsToGetAssociationMixin<Tweet>;

  declare addComment: HasManyAddAssociationMixin<Tweet, string>;
  declare getComments: HasManyGetAssociationsMixin<Tweet>;
  declare countComments: HasManyCountAssociationsMixin;

  declare addRetweet: HasManyAddAssociationMixin<Tweet, string>;
  declare getRetweets: HasManyGetAssociationsMixin<Tweet>;
  declare countRetweets: HasManyCountAssociationsMixin;

  declare static associations: {
    user: Association<Tweet, User>;
    quoted: Association<Tweet, Tweet>;
    quotedTweets: Association<Tweet, Tweet>;
    parent: Association<Tweet, Tweet>;
    comments: Association<Tweet, Tweet>;
    likes: Association<Tweet, Like>;
    images: Association<Tweet, Image>;
  };

  static associate({ User }: Models) {
    console.log("ASSOCIATING TWEETS");

    Tweet.belongsTo(User, { as: "user" });

    Tweet.hasMany(Tweet, {
      sourceKey: "id",
      foreignKey: "parentId",
      as: "comments",
    });
    Tweet.belongsTo(Tweet, { as: "parent" });

    Tweet.hasMany(Tweet, {
      sourceKey: "id",
      foreignKey: "quotedId",
      as: "retweets",
    });
    Tweet.belongsTo(Tweet, { as: "quoted" });

    Tweet.hasMany(Like, {
      foreignKey: "tweetId",
      as: "likes",
    });

    Tweet.hasMany(Image, {
      foreignKey: "tweetId",
      as: "images",
    });
  }
}

export const init: Init = (sequelize: Sequelize) => {
  Tweet.init(
    {
      ...genericFields,
      content: DataTypes.TEXT,
      type: {
        type: DataTypes.ENUM,
        defaultValue: TweetType.ORIGINAL,
        values: [
          TweetType.ORIGINAL,
          TweetType.QUOTE_RETWEET,
          TweetType.RETWEET,
        ],
      },
    },
    { sequelize, tableName: "tweets" }
  );

  return Tweet;
};

export default Tweet;
