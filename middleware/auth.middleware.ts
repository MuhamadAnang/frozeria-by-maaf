"use server";

import { TMiddlewareResponse } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";

export type TAuthMiddlewareData = {
  clerkUserId: string;
  sessionId: string;
};

export const authMiddleware = async (
  _req: NextRequest,
): Promise<TMiddlewareResponse<TAuthMiddlewareData>> => {
  return {
    pass: true,
    data: {
      clerkUserId: "auth-disabled",
      sessionId: "auth-disabled",
    },
    response: NextResponse.json({ message: "Auth disabled" }, { status: 200 }),
  };
};
