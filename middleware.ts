// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const paths = {
    specialist: ["/specialist"],
    user: ["/user"],
    logged: ["/profile"]
}
let matcher = ["/sign-in"];
for(let path in paths){
    for(let role of paths[path]) {
        matcher.push(`${role}/:path*`);
    }
}


export default withAuth(
    function middleware(request) {
        const pathname = request.nextUrl.pathname;
        const origin = request.nextUrl.origin;
        const type = request.nextauth.token?.type;

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-url', request.url);
        requestHeaders.set('x-origin', origin);
        requestHeaders.set('x-pathname', pathname);
        
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

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        });
    },
    {
        callbacks: {
            authorized: ({ token }) => { return true },
        },
    }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: [...matcher] }