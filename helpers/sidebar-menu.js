export const appSidebarMenu = () => [
  {
    text: "application",
    is_header: true,
  },
  {
    to: "/",
    icon: "house",
    title: "home",
  },
  {
    to: "",
    icon: "boxes",
    title: "administration",
    children: [
      { to: "/admin/categories", title: "categories" },
      { to: "/admin/products", title: "products" },
    ],
  },
  { to: "/admin/clients", icon: "person-badge-fill", title: "clients" },
  {
    to: "/users",
    icon: "people",
    title: "users",
  },
  // {
  //   to: "",
  //   icon: "fa fa-align-left",
  //   title: "Menu Level",
  //   children: [
  //     { to: "/menu/menu-1-2", title: "Menu 1.2" },
  //     { to: "/menu/menu-1-3", title: "Menu 1.3" },
  //   ],
  // },
];
