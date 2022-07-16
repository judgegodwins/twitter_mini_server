import { NotFoundError } from "../../core/ApiError";
import UserRepo from "../../database/repositories/UserRepo";
import { wrapServiceAction } from "../../utils";
import { FollowActionRequest } from "../../validators";

export default wrapServiceAction({
  schema: FollowActionRequest,
  handler: async (params) => {
    const user = await UserRepo.model.findByPk(params.id);

    if (!user) throw new NotFoundError('User not found');

    if (params.type === 'follow') {
      await user.addFollower(params.userId);
    } else {
      await user.removeFollower(params.userId);
    }
  },
});
