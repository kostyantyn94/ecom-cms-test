import { destroySession, getSession } from "~/.server/admin/utils/session.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { redirect } from "@remix-run/react";

export const adminAuthLogout = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect(EAdminNavigation.authLogin, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
