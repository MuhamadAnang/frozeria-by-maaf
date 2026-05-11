import { handleAuthenticatedRequest } from "@/lib/request";
import { createItemController, getItemsController } from "@/server/items/item.controller";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    return await handleAuthenticatedRequest({
        request: req,
        callback: createItemController,
    });
};

export const GET = async (req: NextRequest) => {
    return await handleAuthenticatedRequest({
        request: req,
        callback: getItemsController,
    });
};