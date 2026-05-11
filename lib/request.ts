import { authMiddleware, TAuthMiddlewareData } from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

interface IMiddlewareResponseBase {
  pass: boolean;
  response: NextResponse;
}

export interface IMiddlewareResponseWithData<T> extends IMiddlewareResponseBase {
  pass: true;
  data: T;
}

export interface IMiddlewareResponseWithoutData extends IMiddlewareResponseBase {
  pass: false;
}

export type TMiddlewareResponse<T> =
  | IMiddlewareResponseWithData<T>
  | IMiddlewareResponseWithoutData;

type TRequestCallback<TContext> = (req: NextRequest, context: TContext) => Promise<unknown>;

type TMiddlewareFunction<T = unknown> = (req: NextRequest) => Promise<TMiddlewareResponse<T>>;

interface IMiddlewareRequest<TContext = TAuthMiddlewareData> {
  request: NextRequest;
  callback: TRequestCallback<TContext>;
  middleware?: TMiddlewareFunction<unknown>[];
  params?: unknown;
}

export const handleAuthenticatedRequest = async <TContext = TAuthMiddlewareData>({
  request,
  callback,
  middleware = [],
  params,
}: IMiddlewareRequest<TContext>): Promise<NextResponse> => {
  const authResult = await authMiddleware(request);

  if (!authResult.pass) {
    return authResult.response;
  }

  const authData = authResult.data;

  if (middleware.length > 0) {
    for (const middlewareFunction of middleware) {
      const result = await middlewareFunction(request);
      if (!result.pass) {
        return result.response;
      }
    }
  }

  const context = (params ? { params } : authData) as TContext;
  const result = await callback(request, context);

  if (result instanceof NextResponse) {
    return result;
  }

  return NextResponse.json(result);
};
