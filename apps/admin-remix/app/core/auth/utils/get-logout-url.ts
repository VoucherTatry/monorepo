import { LOGIN_URL } from "~/core/auth/const";
import { makeRedirectToFromHere } from "~/core/utils/http.server";

export default function getLogoutURL(request: Request) {
  const fromURLInfo = makeRedirectToFromHere(request);
  const fullUrl = `${LOGIN_URL}?${fromURLInfo}`;

  return { fullUrl, fromURLInfo };
}
