// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const paths = {
    specialist: ["/specialist"],
    user: ["/user"],
    logged: ["/profile"]
}
const both = ["/profile"];
const types = ["specialist", "user"];
const matcher = [...types.map((path) => `/${path}/:path*`), ...both.map((path) => `${path}/:path*`), "/sign-in"];

export default withAuth(
    function middleware(request) {
        const pathname = request.nextUrl.pathname;
        const type = request.nextauth.token?.type;

        const isAuth = !!type;

        if (pathname.startsWith("/sign-in") && isAuth){
            return NextResponse.redirect(
                new URL(`/${type}`, request.url)
            )
        }

        for(let path in paths){
            for(let role of paths[path]) {
                if (pathname.startsWith(role)
                && (type !== path && (path !== "logged" || !isAuth))) {
                    return NextResponse.rewrite(
                        new URL("/denied", request.url)
                    )
                }
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => { return true },
        },
    }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: matcher }