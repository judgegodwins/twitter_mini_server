import { NotFoundError } from "../../core/ApiError";
import LikeRepo from "../../database/repositories/LikeRepo";
import TweetRepo from "../../database/repositories/TweetRepo";
import { wrapServiceAction } from "../../utils";
import { LikeTweetRequest,  } from "../../validators/tweet";

export default wrapServiceAction({
  schema: LikeTweetRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.model.findByPk(params.tweetId);

    if (!tweet) throw new NotFoundError('Tweet not found');

    const like = await LikeRepo.model.create(params);

    return like;
  },
});
