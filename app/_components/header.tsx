"use client"

import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";

const Header = () => {

  return (
    <Card>
      <CardContent className="p-4 justify-between flex flex-row items-center">

        <Link href="/" >
          <Image src="/logo.png" alt="Agende barber" height={36} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16}></MenuIcon>
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

      </CardContent>
    </Card>
  );
}

export default Header;