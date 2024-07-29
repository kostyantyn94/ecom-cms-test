import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constants/navigation.constants";

export async function adminDashboardLoader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  return json({ user });
}
