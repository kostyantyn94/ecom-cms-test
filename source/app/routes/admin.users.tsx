import React from "react";
import { Outlet } from "@remix-run/react";
import { BaseLayout } from "~/admin/layouts/BaseLayout/BaseLayout";
import { useLoaderData } from "@remix-run/react";
import { adminDashboardLoader } from "~/.server/admin/loaders/dashboard.loader";

export const loader = adminDashboardLoader;

export default function AdminUsers() {
  const { user } = useLoaderData<typeof loader>();
  const { fullName, role } = user;
  console.log(fullName);
  return (
    <BaseLayout fullName={(fullName)}>
      <Outlet />
    </BaseLayout>
  );
}
