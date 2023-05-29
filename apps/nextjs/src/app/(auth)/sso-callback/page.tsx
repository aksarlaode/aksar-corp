"use client";

import { useEffect } from "react";

import { useClerk } from "@clerk/nextjs";
import type { HandleOAuthCallbackParams } from "@clerk/types";

import { Icons } from "@aksar/ui/icons";

export const runtime = "edge";

export default function SSOCallback(props: {
  searchParams: HandleOAuthCallbackParams;
}) {
  console.log("SSO Callback", props);
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    void handleRedirectCallback(props.searchParams);
  }, [props, handleRedirectCallback]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.spinner className="mr-2 h-16 w-16 animate-spin" />
    </div>
  );
}
