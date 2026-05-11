import { NextRequest } from "next/server";
import { handleException } from "@/common/exception/helper";
import { validateSchema, parseQueryParams } from "@/lib/validation";
import { parseSortParams } from "@/lib/query-param";
import { responseFormatter } from "@/lib/response-formatter";

import {
  createCategoryService,
  deleteCategoryService,
  getCategoryByIdService,
  getCategoriesWithPaginationService,
  updateCategoryService,
} from "./category.service";

import {
  CreateOrUpdateCategorySchema,
  IndexCategoryQuerySchema,
} from "@/schemas/category.schema";
import { TFrozenFoodCategory, TFrozenFoodCategoryWithTotalItems } from "@/types/database";

/* =========================
   CREATE
========================= */
export const createCategoryController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    validateSchema(CreateOrUpdateCategorySchema, body);

    const result = await createCategoryService(body);

    return responseFormatter.created({
      data: result[0],
      message: "Category created successfully",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   LIST
========================= */
export const getCategoriesController = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const raw = {
      page: searchParams.get("page"),
      pageSize: searchParams.get("pageSize"),
      search: searchParams.get("search") || undefined,
      sort: parseSortParams(searchParams),
    };

    const parsed = parseQueryParams(IndexCategoryQuerySchema, raw);

    if (!parsed.success) {
      return responseFormatter.validationError({
        error: parsed.error,
        message: "Invalid query params",
      });
    }

    const { data, meta } = await getCategoriesWithPaginationService(parsed.data);

    return responseFormatter.successWithPagination<TFrozenFoodCategoryWithTotalItems>({
      data,
      meta,
      message: "Categories retrieved",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   DETAIL
========================= */
export const getCategoryByIdController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    const data = await getCategoryByIdService(id);

    return responseFormatter.successWithData<TFrozenFoodCategory>({
      data,
      message: "Category retrieved",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   DELETE
========================= */
export const deleteCategoryController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    await deleteCategoryService(id);

    return responseFormatter.success({
      message: "Category deleted",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   UPDATE
========================= */
export const updateCategoryController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    const body = await req.json();
    validateSchema(CreateOrUpdateCategorySchema, body);

    const updated = await updateCategoryService(id, body);

    return responseFormatter.successWithData<TFrozenFoodCategory>({
      data: updated,
      message: "Category updated",
    });
  } catch (error) {
    return handleException(error);
  }
};