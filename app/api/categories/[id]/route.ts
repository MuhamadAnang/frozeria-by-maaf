import { handleAuthenticatedRequest } from "@/lib/request";
import { deleteCategoryController, getCategoryByIdController, updateCategoryController } from "@/server/categories/category.controller";
import { NextRequest } from "next/server";

type CategoryRouteContext = {
    params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: CategoryRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: getCategoryByIdController,
        params: resolvedParams,
    });
};

export const PUT = async (req: NextRequest, { params }: CategoryRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: updateCategoryController,
        params: resolvedParams,
    });
};

export const DELETE = async (req: NextRequest, { params }: CategoryRouteContext) => {
    const resolvedParams = await params;

    return await handleAuthenticatedRequest({
        request: req,
        callback: deleteCategoryController,
        params: resolvedParams,
    });
};
