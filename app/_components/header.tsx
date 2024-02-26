import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-4 justify-between flex flex-row items-center">
        <Image className="-m-12" src="/logo.png" alt={"FSW Barber"} height={30} width={160} />
        <Button variant="outline" size="icon" className="h-8 w-6">
          <MenuIcon size={16}></MenuIcon>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Header;