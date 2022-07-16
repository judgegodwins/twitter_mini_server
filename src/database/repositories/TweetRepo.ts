import { InferAttributes, fn, col, WhereOptions, literal, Includeable } from "sequelize";
import { Like, User, Tweet, Image } from "../models";
import { TweetType } from "../models/enums";

export interface TweetWithStats extends InferAttributes<Tweet> {
  commentCount: number;
  totalRetweetCount: number;
  retweetCount: number;
  quoteRetweetCount: number;
  likeCount: number;
}

export default class TweetRepo {
  static model = Tweet;

  static _getStatsQuery(alias: string, column: string = "id", include: Includeable[] = []): any {
    return {
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(tweet.id)
              FROM tweets AS tweet
              WHERE tweet."parentId" = "${alias}"."${column}"
            )`), 
            'commentCount'
          ],
          [
            literal(`(
              SELECT COUNT(tweet.id)
              FROM tweets AS tweet
              WHERE tweet."quotedId" = "${alias}"."${column}"
            )`), 
            'totalRetweetCount'
          ],
          [
            literal(`(
              SELECT COUNT(tweet.id)
              FROM tweets AS tweet
              WHERE (tweet."quotedId" = "${alias}"."${column}" AND tweet.type = '${TweetType.RETWEET}')
            )`),
            'retweetCount'
          ],
          [
            literal(`(
              SELECT COUNT(tweet.id)
              FROM tweets AS tweet
              WHERE (tweet."quotedId" = "${alias}"."${column}" AND tweet.type = '${TweetType.QUOTE_RETWEET}')
            )`), 
            'quoteRetweetCount'
          ],
          [fn('COUNT', col('likes.id')), 'likeCount']
      ]
      },
      include: [
        ...include,
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: Like, 
          as: 'likes', 
          attributes: [],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'publicId']
        }
      ],
      group: ['Tweet.id', 'user.id', 'images.id']
    };
  }

  static create(data: Parameters<typeof Tweet.create<Tweet>>[0]) {
    return Tweet.create(data);
  }

  static findOneByClause (where: WhereOptions<InferAttributes<Tweet>>) {
    return Tweet.findOne({
      where,
    });
  }

  static getTweetWithUser(id: string) {
    return Tweet.findByPk(id, { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } });
  }

  // Having issues with self referencing count;
  static getTweetWithStats(id: string) {
    return Tweet.findByPk(id, this._getStatsQuery('Tweet', 'id'));
  }

  static async getStats(tweet: Tweet): Promise<TweetWithStats> {
    return {
      ...tweet.toJSON(),
      commentCount: await tweet.countComments(),
      totalRetweetCount: await tweet.countRetweets(),
      retweetCount: await tweet.countRetweets({ where: { type: TweetType.RETWEET } as WhereOptions<Tweet> }),
      quoteRetweetCount: await tweet.countRetweets({ where: { type: TweetType.QUOTE_RETWEET } as WhereOptions<Tweet> }),
      likeCount: await tweet.countLikes(),
    };
  }

  static getComments(parentId: string, offset: number, limit: number) {
    return Tweet.findAndCountAll({
      where: {
        parentId,
      },
      ...this._getStatsQuery("Tweet"),
      offset,
      limit,
      subQuery: false,
    });
  }
}