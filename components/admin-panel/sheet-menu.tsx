import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.svg";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className="lg:hidden"
        render={
          <Button className="h-8" variant="outline" size="icon">
            <MenuIcon size={20} />
          </Button>
        }
      />
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            nativeButton={false}
            className="flex items-center justify-center pt-1 pb-2"
            variant="link"
            render={
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="mr-1 size-6" />
                <SheetTitle className="font-heading text-lg font-bold text-foreground">
                  FormalLab
                </SheetTitle>
              </Link>
            }
          />
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
