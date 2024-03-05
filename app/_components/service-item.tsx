"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from '@prisma/client'
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {

  const router = useRouter();

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google")
    }
    router.push(`/barbershops/${service.barbershopId}`)
  }

  return (
    <Card>
      <CardContent className="p-3">

        <div className="flex gap-4 items-center">
          <div className="min-w-[110px] min-h-[110px] max-w-[110px] max-h-[110px] relative">
            <div className="absolute top-1 left-1 z-50">
              <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-3 left-3">
                <StarIcon size={12} className="fill-primary text-primary" />
                <span className="text-xs">5,0</span>
              </Badge>
            </div>
            <Image
              fill
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              style={
                {
                  objectFit: "cover"
                }
              }
            />
          </div>
          <div className="flex flex-col w-full">

            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">
              {service.description}
            </p>

            <div className="flex items-center justify-between mt-3">

              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    className="ml-3"
                    variant="secondary"
                    onClick={handleBookingClick}>
                    Agendar
                  </Button>
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Fazer agendamento</SheetTitle>
                    </SheetHeader>
                  </SheetContent>               
              </Sheet>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default ServiceItem;
