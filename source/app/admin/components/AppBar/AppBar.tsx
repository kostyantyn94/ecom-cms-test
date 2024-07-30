import { useNavigate } from "@remix-run/react";
import { TopBar, TopBarProps } from "@shopify/polaris";
import { FC, useCallback, useState } from "react";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
export interface AppBarProps {
  onNavigationToggle: TopBarProps["onNavigationToggle"];
}

export const AppBar: FC<AppBarProps> = ({ onNavigationToggle, fullName }) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const handleLogout = () => {
    console.log("Logout Clicked");
    navigate(EAdminNavigation.authLogout);
  };

  const userMenuActions = [
    {
      items: [{ content: "Log out", onAction: handleLogout }],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={fullName}
      detail={"storeName"}
      initials={fullName[0].toUpperCase()}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={onNavigationToggle}
    />
  );
};
