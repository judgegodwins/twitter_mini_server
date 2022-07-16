import { NotFoundError } from "../../core/ApiError";
import { Tweet } from "../../database/models";
import TweetRepo, { TweetWithStats } from "../../database/repositories/TweetRepo";
import { wrapServiceAction } from "../../utils";
import { GetResourceRequest } from "../../validators";


// Check if parent tweet was deleted
async function getParents(tweet: Tweet, initial: Tweet[] = []): Promise<Tweet[]> {
  if (!tweet.parentId || initial.length === 10) return initial;
  const parent = await tweet.getParent(TweetRepo._getStatsQuery("Tweet"));
  initial.push(parent!);
  return getParents(parent, initial);
}

export default wrapServiceAction({
  schema: GetResourceRequest,
  handler: async (params) => {
    const tweet = await TweetRepo.model.findByPk(params.id);

    if (!tweet) throw new NotFoundError("Tweet not found");

    const parents: Tweet[] = await getParents(tweet);

    return parents.reverse();
  },
});
