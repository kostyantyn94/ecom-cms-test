import React, { useCallback, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { Modal, Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UsersSingle } from "~/admin/components/UsersSingle/UsersSingle";
import { adminUsersSingleLoader } from "~/.server/admin/loaders/users.single.loader";
import { adminUsersRoleAction } from "~/.server/admin/actions/users.role.action";

export const loader = adminUsersSingleLoader;

export const action = adminUsersRoleAction;

export default function AdminUsersSingle() {
  const { user } = useLoaderData<typeof loader>();
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const toggleDeleteActive = useCallback(
    () => setIsDeleteActive((active) => !active),
    []
  );

  return (
    <Page
      title={user.fullName || ""}
      backAction={{
        url: EAdminNavigation.users,
      }}
      secondaryActions={[
        {
          content: "Security",
          accessibilityLabel: "Security",
          url: `${EAdminNavigation.users}/${user.id}/security`,
        },
        {
          content: "Delete user",
          accessibilityLabel: "Delete user",
          onAction: toggleDeleteActive,
        },
      ]}
    >
      <UsersSingle user={user} />
      <Modal
        size="small"
        open={isDeleteActive}
        onClose={toggleDeleteActive}
        title="Are you sure you want to delete this user?"
        primaryAction={{
          content: "Confirm",
          url: `${EAdminNavigation.users}/${user.id}/delete`,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleDeleteActive,
          },
        ]}
      >
        <Modal.Section>
          <p>After deleting this user you will not be able to get him back.</p>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
