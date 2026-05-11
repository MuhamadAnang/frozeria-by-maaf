import { NextRequest } from "next/server";
import { handleException } from "@/common/exception/helper";
import { validateSchema, parseQueryParams } from "@/lib/validation";
import { parseSortParams } from "@/lib/query-param";
import { responseFormatter } from "@/lib/response-formatter";

import {
  createItemService,
  deleteItemService,
  getItemByIdService,
  getItemsWithPaginationService,
  updateItemService,
} from "./item.service";

import {
  CreateOrUpdateItemSchema,
  IndexItemQuerySchema,
} from "@/schemas/item.schema";
import { TFrozenFoodItem } from "@/types/database";

/* =========================
   CREATE
========================= */
export const createItemController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    validateSchema(CreateOrUpdateItemSchema, body);

    const result = await createItemService(body);

    return responseFormatter.created({
      data: result[0],
      message: "Item created successfully",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   LIST
========================= */
export const getItemsController = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const raw = {
      page: searchParams.get("page"),
      pageSize: searchParams.get("pageSize"),
      search: searchParams.get("search") || undefined,
      sort: parseSortParams(searchParams),
      categoryId: searchParams.get("categoryId") || undefined,
    };

    const parsed = parseQueryParams(IndexItemQuerySchema, raw);

    if (!parsed.success) {
      return responseFormatter.validationError({
        error: parsed.error,
        message: "Invalid query params",
      });
    }

    const { data, meta } = await getItemsWithPaginationService(parsed.data);

    return responseFormatter.successWithPagination<TFrozenFoodItem>({
      data,
      meta,
      message: "Items retrieved",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   DETAIL
========================= */
export const getItemByIdController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    const data = await getItemByIdService(id);

    return responseFormatter.successWithData<TFrozenFoodItem>({
      data,
      message: "Item retrieved",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   DELETE
========================= */
export const deleteItemController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    await deleteItemService(id);

    return responseFormatter.success({
      message: "Item deleted",
    });
  } catch (error) {
    return handleException(error);
  }
};

/* =========================
   UPDATE
========================= */
export const updateItemController = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const id = parseInt(context.params.id, 10);
    const body = await req.json();
    validateSchema(CreateOrUpdateItemSchema, body);

    const updated = await updateItemService(id, body);

    return responseFormatter.successWithData<TFrozenFoodItem>({
      data: updated,
      message: "Item updated",
    });
  } catch (error) {
    return handleException(error);
  }
};
