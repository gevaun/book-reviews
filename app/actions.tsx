"use server";

import { getServerClient } from "@/app/lib/wix";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction() {
  // initiate OAuth flow
  // We can either store the information in the browser session or in a cookie
  const data = await getServerClient().auth.generateOAuthData(
    `${process.env.NEXT_PUBLIC_URL}/login-callback`,
    process.env.NEXT_PUBLIC_URL // Origin - this is optional
  );
  // Store the data in cookies on the users browser to verify the redirect was successful
  cookies().set("oauthRedirectData", JSON.stringify(data));
  const { authUrl } = await getServerClient().auth.getAuthUrl(data);
  redirect(authUrl);
}
