import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  signInUrl: "/signin",
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/sso-callback(.*)",
    "/terms(.*)",
    "/privacy(.*)",
    "/pricing(.*)",
    "/editor(.*)",
    "/api(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
