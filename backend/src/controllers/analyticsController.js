import { asyncHandler } from "../core/asyncHandler.js";
import { getAnalyticsService } from "../services/analyticsService.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const data = await getAnalyticsService(req.user.id);

  res.json({
    success: true,
    data,
  });
});
