import React from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { adminDashboardLoader } from "~/.server/admin/loaders/dashboard.loader";
import {
  BlockStack,
  Box,
  Card,
  Grid,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export const loader = adminDashboardLoader;

export default function AdminUsersNew() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;
  const navigate = useNavigate();
  console.log(user);

  const handleChangePass = () => {
    navigate("/admin/auth/password");
  };

  return (
    <Page
      title="User info"
      backAction={{
        url: EAdminNavigation.users,
      }}
      actionGroups={[
        {
          title: "More actions",
          actions: [{ content: "Change Password", onAction: handleChangePass }],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card title="User details" sectioned>
            <p>Fullname: {user.fullName}</p>
            <p>Email: {user.email}</p>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card title="Roles" sectioned>
            <p>Role: {user.role}</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
