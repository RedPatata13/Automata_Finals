"use client";

import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full bg-sidebar transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !getOpenState() ? "w-22.5" : "w-72",
        settings.disabled && "hidden",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex h-full flex-col px-3 py-4 shadow-md dark:shadow-zinc-800"
      >
        <Button
          nativeButton={false}
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out hover:no-underline",
            !getOpenState() ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          render={
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="Logo" className="mr-1 size-6" />
              <div
                className={cn(
                  "flex flex-col items-start transition-[transform,opacity,display] duration-300 ease-in-out",
                  !getOpenState()
                    ? "hidden -translate-x-96 opacity-0"
                    : "translate-x-0 opacity-100",
                )}
              >
                <span className="font-heading text-lg font-bold whitespace-nowrap text-sidebar-foreground">
                  FormalLab
                </span>
              </div>
            </Link>
          }
        />
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
