import { json, useLoaderData } from "@remix-run/react";
import React from "react";
import { loader } from "./admin.auth.login";
import { authenticator } from "~/.server/services/auth.service";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/auth/login",
  });

  return json({ user });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Admin</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
