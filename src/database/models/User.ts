import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Init, Models } from "../../types/db";
import Follow from "./Follow";
import GenericModel, { genericFields } from "./generic";
import { Tweet, Like } from "./index";

class User extends GenericModel<User> {
  declare username: string;
  declare name: string;
  declare password: string;

  tweets?: NonAttribute<Tweet[]>;

  followers?: NonAttribute<User[]>;
  followings?: NonAttribute<User[]>;

  declare getTweets: HasManyGetAssociationsMixin<Tweet>;
  declare addTweet: HasManyAddAssociationMixin<Tweet, string>;
  declare addTweets: HasManyGetAssociationsMixin<Tweet>;
  declare createTweet: HasManyCreateAssociationMixin<Tweet, "userId">;
  declare removeTweet: HasManyRemoveAssociationMixin<Tweet, string>;
  declare hasTweet: HasManyHasAssociationMixin<Tweet, string>;

  declare getFollowers: BelongsToManyGetAssociationsMixin<User>;
  declare getFollowing: BelongsToManyGetAssociationsMixin<User>;
  declare addFollower: BelongsToManyAddAssociationMixin<User, string>;
  declare removeFollower: BelongsToManyRemoveAssociationMixin<User, string>;

  declare static associations: {
    tweets: Association<User, Tweet>;
    followers: Association<User, User>;
    following: Association<User, User>;
  };

  static sensitiveFields = ["password"];

  static associate(models: Models) {
    console.log("ASSOCIATING USERS");
    User.hasMany(Tweet, {
      sourceKey: "id",
      foreignKey: "userId",
      as: "tweets",
    });

    User.hasMany(Like, {
      foreignKey: "userId",
      as: 'likes'
    });

    User.belongsToMany(User, {
      through: Follow,
      foreignKey: 'ownerId',
      as: 'followers', // list of followers a user has
    });

    User.belongsToMany(User, {
      through: Follow,
      foreignKey: 'followerId',
      as: 'following', // list of users a user is following
    });
  }
}

export const init: Init = (sequelize: Sequelize) => {
  User.init(
    {
      ...genericFields,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: new DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
    },
    { sequelize, tableName: "users" }
  );

  return User;
};

export default User;
