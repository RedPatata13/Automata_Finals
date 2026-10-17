import Link from "next/link";
import Logo from "@/assets/logo.svg";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sidebar backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sidebar-accent-foreground"
        >
          <Image src={Logo} alt="Logo" className="mr-1 size-6" />
          <span className="text-lg font-bold whitespace-nowrap">FormalLab</span>
        </Link>

        <span className="hidden text-sm whitespace-nowrap text-sidebar-foreground/70 sm:inline">
          Automata & Language Theory
        </span>
      </div>
    </header>
  );
}
