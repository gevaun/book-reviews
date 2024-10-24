"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
// import { cookies } from "nexgetSt/headers";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "defaultClientId";

export function getClient() {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: clientId,
      // Check if the user has a session cookie
      // tokens: JSON.parse(cookies().get("session")?.value || "null"),
    }),
  });
}

export function convertWixImageToUrl(wixImageUrl: string) {
  return `https://static.wixstatic.com/media/${wixImageUrl.split("/")[3]}`;
}