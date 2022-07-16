import { NotFoundError } from "../../core/ApiError";
import TweetRepo from "../../database/repositories/TweetRepo";
import { wrapServiceAction } from "../../utils";
import { GetResourceRequest } from "../../validators";

export default wrapServiceAction({
  schema: GetResourceRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.getTweetWithStats(params.id);

    if (!tweet) throw new NotFoundError('Tweet not found')

    return tweet;
  },
});
