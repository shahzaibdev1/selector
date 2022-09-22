// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Marketplaces from "layouts/marketplaces";
import PageTypes from "layouts/pageTypes";
import Countries from "layouts/countries";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import BillingPage from "layouts/billingsPage";
import Logout from "layouts/authentication/sign-in/Logout";
import { useContext } from "react";
import { AuthContext } from "contexts/authContext";
import { ProtectedRoute } from "examples/ProtectedRoutes";

export const useRoutes = () => {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") {
    return [
      {
        type: "collapse",
        name: "billing page",
        key: "billing-page",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/billing-page",
        component: (
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Selectors Table",
        key: "selectors-tables",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/selectors-tables",
        component: (
          <ProtectedRoute>
            <Tables />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Marketplaces",
        key: "marketplaces",
        icon: <Icon fontSize="small">store</Icon>,
        route: "/marketplaces",
        component: (
          <ProtectedRoute>
            <Marketplaces />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Page Types",
        key: "page-types",
        icon: <Icon fontSize="small">web</Icon>,
        route: "/page-types",
        component: (
          <ProtectedRoute>
            <PageTypes />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Countries",
        key: "countries",
        icon: <Icon fontSize="small">public</Icon>,
        route: "/countries",
        component: (
          <ProtectedRoute>
            <Countries />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/billing",
        component: (
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        ),
      },
      // {
      //   type: "collapse",
      //   name: "RTL",
      //   key: "rtl",
      //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
      //   route: "/rtl",
      //   component:
      // <ProtectedRoute>
      //   <RTL />
      // </ProtectedRoute>,
      // },
      {
        type: "collapse",
        name: "Notifications",
        key: "notifications",
        icon: <Icon fontSize="small">notifications</Icon>,
        route: "/notifications",
        component: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/profile",
        component: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Log out",
        key: "Log out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/logout",
        component: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },

      // {
      //   type: "collapse",
      //   name: "Sign In",
      //   key: "sign-in",
      //   icon: <Icon fontSize='small'>login</Icon>,
      //   route: "/authentication/sign-in",
      //   component:
      // <SignIn />
      // },
      // {
      //   type: "collapse",
      //   name: "Sign Up",
      //   key: "sign-up",
      //   icon: <Icon fontSize='small'>assignment</Icon>,
      //   route: "/authentication/sign-up",
      //   component:
      // <SignUp />
      // },
    ];
  } else if (user?.role === "user") {
    return [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "billing page",
        key: "billing-page",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/billing-page",
        component: (
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Log out",
        key: "Log out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/logout",
        component: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
    ];
  } else if (user?.role === "sub-admin") {
    return [
      {
        type: "collapse",
        name: "billing page",
        key: "billing-page",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: "/billing-page",
        component: (
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Selectors Table",
        key: "selectors-tables",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/selectors-tables",
        component: (
          <ProtectedRoute>
            <Tables />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Marketplaces",
        key: "marketplaces",
        icon: <Icon fontSize="small">store</Icon>,
        route: "/marketplaces",
        component: (
          <ProtectedRoute>
            <Marketplaces />
          </ProtectedRoute>
        ),
      },
      {
        type: "collapse",
        name: "Log out",
        key: "Log out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/logout",
        component: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
    ];
  } else {
    return [
      {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn />,
      },
      {
        type: "collapse",
        name: "Sign Up",
        key: "sign-up",
        icon: <Icon fontSize="small">assignment</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp />,
      },
      {
        type: "collapse",
        name: "Log out",
        key: "Log out",
        icon: <Icon fontSize="small">logout</Icon>,
        route: "/authentication/logout",
        component: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
    ];
  }
};
