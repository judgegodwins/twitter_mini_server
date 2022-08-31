import TweetRepo from "../../database/repositories/TweetRepo";
import { calcSkip, paginateResponse, wrapServiceAction } from "../../utils";
import { PaginationRequest } from "../../validators";

export default wrapServiceAction({
  schema: PaginationRequest,
  handler: async (params) => {
    const offset = calcSkip(params.page, params.limit);

    const tweets = await TweetRepo.getTweets(offset, params.limit);

    // Sequelize has a type (buggy) issue with using GROUP BY in findAndCountAll calls
    // https://github.com/sequelize/sequelize/issues/6148
    return paginateResponse(
      tweets.rows,
      (tweets.count as unknown as any[]).length,
      params.page,
      params.limit
    );
  },
});
