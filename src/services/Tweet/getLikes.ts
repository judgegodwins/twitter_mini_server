import { NotFoundError } from "../../core/ApiError";
import TweetRepo from "../../database/repositories/TweetRepo";
import LikeRepo from "../../database/repositories/LikeRepo";
import { calcSkip, paginateResponse, wrapServiceAction } from "../../utils";
import { GetResourcesPaginatedRequest } from "../../validators";

export default wrapServiceAction({
  schema: GetResourcesPaginatedRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.model.findByPk(params.id);

    if (!tweet) throw new NotFoundError("Tweet not found");

    const offset = calcSkip(params.page, params.limit);

    const likes = await LikeRepo.getLikes(tweet.id, offset, params.limit);

    return paginateResponse(likes.rows, likes.count, params.page, params.limit);
  },
});
