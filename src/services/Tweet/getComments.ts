import { NotFoundError } from "../../core/ApiError";
import { Tweet } from "../../database/models";
import TweetRepo from "../../database/repositories/TweetRepo";
import { calcSkip, paginateResponse, wrapServiceAction } from "../../utils";
import { GetResourcesPaginatedRequest } from "../../validators";

export default wrapServiceAction({
  schema: GetResourcesPaginatedRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.model.findByPk(params.id);

    if (!tweet) throw new NotFoundError("Tweet not found");

    const offset = calcSkip(params.page, params.limit);

    const comments = await TweetRepo.getComments(tweet.id, offset, params.limit);

    // Sequelize has a type (buggy) issue with count
    return paginateResponse(comments.rows, ((comments.count as unknown) as any[]).length, params.page, params.limit);
  },
});
