import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  customSessionClient,
  emailOTPClient,
  inferAdditionalFields,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
    lastLoginMethodClient(),
    adminClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  verifyEmail,
  changePassword,
  changeEmail,
  updateUser,
  deleteUser,
} = authClient;
