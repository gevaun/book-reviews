import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { members, authorization } from "@wix/members";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || 'defaultClientId';

export function getServerClient() {
  return createClient({
    modules: { items, members, authorization },
    auth: OAuthStrategy({
      clientId: clientId,
    }),
  });
}

export async function getMember() {
  const client = getServerClient();
  
  if (!client.auth.loggedIn()) {
    return undefined;
  }
  
  const { member } = await client.members.getCurrentMember();

  console.log('member', member);
  return member?
    {
      id: member?._id,
      loginEmail: member?.loginEmail,
      nickname: member.profile?.nickname,
      slug: member.profile?.slug,
    } :
    undefined

}