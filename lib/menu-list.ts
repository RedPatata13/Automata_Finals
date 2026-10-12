import { Layers, type LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  id: string;
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(_pathname: string): Group[] {
  return [
    {
      groupLabel: "Formal Language Tools",
      menus: [
        {
          id: "language-operations",
          href: "/",
          label: "Language Operations",
          icon: Layers,
          submenus: [],
        },
      ],
    },
  ];
}
