import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || 'defaultClientId';

export function getServerClient() {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: clientId,
    }),
  });
}
