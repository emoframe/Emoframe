// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { forms } from "@/types/forms"
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

const formValues = forms.map(form => form.value);

export default withAuth(
    function middleware(request) {
        const pathname = request.nextUrl.pathname;
        const origin = request.nextUrl.origin;
        const type = request.nextauth.token?.user.type;
        const user = request.nextauth.token?.user;

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

        let subtraction: any = [];
        if(user?.type === "user") {
            subtraction = formValues.filter(value => user.forms.indexOf(value) < 0);
            console.log(subtraction);
        }

        for(let form in subtraction) {
            if (pathname.startsWith(`/user/form/${form}`)) {
                console.log(`TESTE /user/form/${form}`);
                return NextResponse.rewrite(
                    new URL("/denied", request.url)
                )
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
export const config = { matcher: ["/sign-in", "/specialist/:path*", "/user/:path*", "/profile/:path*"] }