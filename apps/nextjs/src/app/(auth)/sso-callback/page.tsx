"use client";

import { useEffect } from "react";

import type { HandleOAuthCallbackParams } from "@clerk/types";

import { useClerk } from "@clerk/nextjs";

import * as Icons from "@aksar/ui/icons";

export const runtime = "edge";

export default function SSOCallback(props: {
  searchParams: HandleOAuthCallbackParams;
}) {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(props.searchParams);
  }, [props.searchParams, handleRedirectCallback]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.Spinner className="mr-2 h-16 w-16 animate-spin" />
    </div>
  );
}
