import React from "react";
import { BaseLayout } from "~/admin/layouts/BaseLayout/BaseLayout";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { adminDashboardLoader } from "~/.server/admin/loaders/dashboard.loader";

export const loader = adminDashboardLoader;

export default function AdminDashboard() {
  const { user } = useLoaderData<typeof loader>();
  const { fullName } = user;
  return (
    <BaseLayout fullName={fullName}>
      <Outlet />
    </BaseLayout>
  );
}
