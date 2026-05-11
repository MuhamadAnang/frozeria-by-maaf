import { handleAuthenticatedRequest } from "@/lib/request";
import { deleteItemController, getItemByIdController, updateItemController } from "@/server/items/item.controller";
import { NextRequest } from "next/server";

type ItemRouteContext = {
    params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: ItemRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: getItemByIdController,
        params: resolvedParams,
    });
};

export const PUT = async (req: NextRequest, { params }: ItemRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: updateItemController,
        params: resolvedParams,
    });
};

export const DELETE = async (req: NextRequest, { params }: ItemRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: deleteItemController,
        params: resolvedParams,
    });
};
