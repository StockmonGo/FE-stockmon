import { NextResponse, type NextRequest } from "next/server";

export default function Middleware(request: NextRequest) {
  const authPaths = ["/profile", "/books", "/yard", "/alliances", "/game", "/message"];
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const accessToken = request.cookies.get("accessToken");

  // 로그인이 필요한 페이지의 경우 리다이렉트
  console.log("이거 맞음?", accessToken);
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (!accessToken?.value) {
      const url = new URL("/users/login", request.url);
      return NextResponse.redirect(url);
    }
  }
  // 로그인 되어 있는 경우 요청 페이지로 진행
  return NextResponse.next();
}
