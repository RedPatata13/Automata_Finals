"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className="mr-2 h-8 w-8 rounded-full bg-background"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="text-foreground h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-transform duration-500 ease-in-out dark:scale-100 dark:rotate-0" />
            <Moon className="text-foreground absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-transform duration-500 ease-in-out dark:scale-0 dark:-rotate-90" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        }
      />
      <TooltipContent side="bottom">Switch Theme</TooltipContent>
    </Tooltip>
  );
}
