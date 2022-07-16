import { User } from "../models";
import Like from "../models/Like";

export default class LikeRepo {
  static model = Like;

  static getLikes(tweetId: string, offset: number, limit: number) {
    return Like.findAndCountAll({
      where: {
        tweetId,
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['username']
      },
      offset,
      limit,
    });
  }
}
