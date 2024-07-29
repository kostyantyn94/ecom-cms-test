import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constants/navigation.constants";
import { commitSession, getSession } from "../utils/session.utils";

export async function adminAuthLoader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: EAdminNavigation.dashboard,
  });
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);
  return json<{ error?: { message: string } }>(
    { error },
    {
      headers: {
        "Set-Cookie": await commitSession(session), // You must commit the session whenever you read a flash
      },
    }
  );
}
