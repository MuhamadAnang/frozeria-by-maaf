"use client";

import { client } from "@/lib/axios";

export default function useAuthenticatedClient() {
  return client;
}
