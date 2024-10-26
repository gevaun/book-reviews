import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { members, authorization } from "@wix/members";
import Cookies from 'js-cookie'

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "defaultClientId";

export function getClient() {
  return createClient({
    modules: { items, members, authorization },
    auth: OAuthStrategy({
      clientId: clientId,
      // Check if the user has a session cookie
      tokens: JSON.parse(Cookies.get("session") || "null"),
    }),
  });
}

export function convertWixImageToUrl(wixImageUrl: string) {
  return `https://static.wixstatic.com/media/${wixImageUrl.split("/")[3]}`;
}