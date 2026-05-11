import { handleAuthenticatedRequest } from "@/lib/request";
import { createCategoryController, getCategoriesController } from "@/server/categories/category.controller";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    return await handleAuthenticatedRequest({
        request: req,
        callback: createCategoryController,
    });
};

export const GET = async (req: NextRequest) => {
    return await handleAuthenticatedRequest({
        request: req,
        callback: getCategoriesController,
    });
};