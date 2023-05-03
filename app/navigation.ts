import type { NavigationItem } from "./types/base";


const NavLinks: Array<NavigationItem> = [
  {
    title: 'dashboard.sideBar.main',
    path: "/dashboard/home",
    icon: "mdi-home",
    role: "",
  },
  {
    title: 'dashboard.sideBar.mySubsecriptions',
    path: "/dashboard/subscription",
    icon: "mdi-package-variant-closed",
    role: "",
  },

  {
    header: "dashboard.sideBar.myQrs",
    path: "",
    title: ""
  },

  {
    title: 'dashboard.sideBar.all',
    path: "/dashboard/myQrs/all",
    icon: "mdi-format-list-checkbox",
    role: "",
  },
  {
    title: 'dashboard.sideBar.activeCodes',
    path: "/dashboard/myQrs/active",
    icon: "mdi-pause-circle",
    role: "",
  },
  {
    title: 'dashboard.sideBar.stopped',
    path: "/dashboard/myQrs/stopped",
    icon: "mdi-cog-play-outline",
    role: "",
  },

  {
    title: "",
    path: "",
    header: "dashboard.sideBar.contentManagement",
  },
  {
    title: 'dashboard.sideBar.myAccoutns',
    path: "/dashboard/myaccount",
    icon: "mdi-account",
    role: "",
  },

  {
    title: 'dashboard.sideBar.techSupport',
    path: "/dashboard/support",
    icon: "mdi-cog-outline",
    role: "",
  },

];
export { NavLinks };
