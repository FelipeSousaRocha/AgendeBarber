"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from '@prisma/client'
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import { useRouter } from "next/navigation";

interface ServiceItemProps {
  service: Service;
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const ServiceItem = ({ service }: ServiceItemProps) => {

  const router = useRouter();

  const handleBookingClick = () => {
    router.push(`/barbershops/${service.barbershopId}`)
  }

  return (
    <Card className="min-w-[167px] max-w[167px] rounded-2xl">
      <CardContent className="px-1 py-0">

        <div className="w-full h-[120px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-3 left-3">
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            fill
            className="rounded-2xl"
            src={service.imageUrl}
            alt={service.name}
            style={
              {
                objectFit: "cover"
              }
            }
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{service.name}</h2>
          <p className="text-primary text-lg overflow-hidden text-ellipsis text-nowrap">{formatter.format(Number(service.price))}</p>
          <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>Agendar</Button>
        </div>

      </CardContent>
    </Card>
  );
}

export default ServiceItem;
