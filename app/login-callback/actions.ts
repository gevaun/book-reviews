"use server";

import { getServerClient } from "@/app/lib/wix";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";

// Wix returns data that can only be do some things on the client side

export async function loginCallbackAction(url: string) {
  console.log("loginCallbackAction", url);

  // Parse the URL to get the OAuth data
  const returnedOAuthData = getServerClient().auth.parseFromUrl(url);

  if (returnedOAuthData.error) {
    throw new Error(returnedOAuthData.errorDescription);
  }

  // Then we check the cookies
  const oauthDataStr = cookies().get("oauthRedirectData")?.value;
  cookies().delete("oauthRedirectData");

  if (!oauthDataStr) {
    return new Response("No oauth data found", { status: 400 });
  }

  // Parse the cookie here
  const oauthData = JSON.parse(oauthDataStr) as OauthData;

  // Compare the data retuned from the OAuth flow with the data stored in the cookie
  const memberTokens = await getServerClient().auth.getMemberTokens(
    returnedOAuthData.code,
    returnedOAuthData.state,
    oauthData
  );

  // Then we get a refresh and an access token
  const serializableTokens = {
    accessToken: memberTokens.accessToken,
    refreshToken: memberTokens.refreshToken,
  };

  // Store the tokens in the session cookie
  // This will contain who the user is and how long the have access to the site
  cookies().set("session", JSON.stringify(serializableTokens));
}
