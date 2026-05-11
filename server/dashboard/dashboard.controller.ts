import { handleException } from "@/common/exception/helper";
import { responseFormatter } from "@/lib/response-formatter";
import { NextRequest } from "next/server";
import { getDashboardStatsService } from "./dashboard.service";

export const getDashboardStatsController = async (_request: NextRequest) => {
  try {
    const data = await getDashboardStatsService();
    return responseFormatter.successWithData({ data });
  } catch (error) {
    return handleException(error);
  }
};
