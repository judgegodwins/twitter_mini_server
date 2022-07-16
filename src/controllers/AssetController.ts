import { SuccessResponse } from '../core/ApiResponse';
import * as AssetService from '../services/Asset';
import asyncHandler from '../utils/asyncHandler';

export default class AssetController {
  public static generateCloudinarySignature = asyncHandler(async (req, res) => {
    const data = await AssetService.generateCloudinarySignature({});

    return new SuccessResponse("Cloudinary signature", data).send(res);
  })
}