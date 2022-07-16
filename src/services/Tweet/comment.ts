import { NotFoundError } from "../../core/ApiError";
import TweetRepo from "../../database/repositories/TweetRepo";
import { wrapServiceAction } from "../../utils";
import { CommentRequest,  } from "../../validators/tweet";

export default wrapServiceAction({
  schema: CommentRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.model.findByPk(params.parentId);

    if (!tweet) throw new NotFoundError('Parent tweet not found');

    const comment = await TweetRepo.model.create(params);

    return comment;
  },
});
