import type { NextAuthConfig } from "next-auth";

import Discord from "next-auth/providers/discord";

export default {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
