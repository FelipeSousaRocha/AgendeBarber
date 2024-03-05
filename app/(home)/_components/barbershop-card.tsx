import { Barbershop } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

interface BarbershopCardProps {
  barbershop: Barbershop;
}

const BarbershopCard = ({ barbershop }: BarbershopCardProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="w-full h-[120px] relative">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            className="rounded-2xl"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
          <p className="text-primary text-sm font-bold">
            {barbershop.address}
          </p>
          <Link href={`/barbershops/${barbershop.id}`} passHref>
            <Button className="w-full mt-3" variant="secondary">
              Ver detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default BarbershopCard;
