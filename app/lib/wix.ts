import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const clientId = process.env.WIX_CLIENT_ID || 'defaultClientId';

const client = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: clientId,
  }),
});

export default client;