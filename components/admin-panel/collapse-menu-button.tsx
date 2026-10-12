"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Dot, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  // active,
  submenus,
  isOpen,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active === undefined ? submenu.href === pathname : submenu.active,
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
        render={
          <Button
            variant={isSubmenuActive ? "secondary" : "ghost"}
            className="h-10 w-full justify-start"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon size={18} />
                </span>
                <p
                  className={cn(
                    "max-w-37.5 truncate",
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0",
                  )}
                >
                  {label}
                </p>
              </div>
              <div
                className={cn(
                  "whitespace-nowrap",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                )}
              >
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        }
      />
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            variant={
              (active === undefined && pathname === href) || active
                ? "secondary"
                : "ghost"
            }
            className="mb-1 h-10 w-full justify-start"
            render={
              <Link href={href}>
                <span className="mr-4 ml-2">
                  <Dot size={18} />
                </span>
                <p
                  className={cn(
                    "max-w-42.5 truncate",
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0",
                  )}
                >
                  {label}
                </p>
              </Link>
            }
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <Tooltip disableHoverablePopup>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant={isSubmenuActive ? "secondary" : "ghost"}
                  className="mb-1 h-10 w-full justify-start"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <span className={cn(isOpen === false ? "" : "mr-4")}>
                        <Icon size={18} />
                      </span>
                      <p
                        className={cn(
                          "max-w-50 truncate",
                          isOpen === false ? "opacity-0" : "opacity-100",
                        )}
                      >
                        {label}
                      </p>
                    </div>
                  </div>
                </Button>
              }
            />
          }
        />
        <TooltipContent side="right" align="start" alignOffset={2}>
          {label}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-47.5 truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label, active }, index) => (
          <DropdownMenuItem
            key={index}
            render={
              <Link
                className={`cursor-pointer ${
                  ((active === undefined && pathname === href) || active) &&
                  "bg-secondary"
                }`}
                href={href}
              >
                <p className="max-w-45 truncate">{label}</p>
              </Link>
            }
          />
        ))}
        {/* <DropdownMenuArrow className="fill-border" /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
