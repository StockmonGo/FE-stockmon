import { NextResponse, type NextRequest } from "next/server";

export default function Middleware(request: NextRequest) {
  const authPaths = ["/profile", "/books", "/yard", "/alliances", "/game", "/message"];
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;
  
  // // 로그인이 필요한 페이지의 경우
  if (authPaths.some((path) => pathname.startsWith(path))) {
    const auth = cookies.has('auth')
    if (!auth) {
      const url = new URL("/users/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
