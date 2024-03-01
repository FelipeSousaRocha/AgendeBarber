import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Plan } from '@prisma/client'; // Importe o tipo correto do Prisma para Plan
import Image from "next/image";

interface PlanItemProps {
  plan: Plan;
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const PlanItem = ({ plan }: PlanItemProps) => {
  return (
    <Card className="min-w-[167px] max-w[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="w-full h-[120px] relative">
          {plan.imageUrl && ( // Verifica se plan.imageUrl não é null ou undefined
            <Image
              fill
              className="rounded-2xl"
              src={plan.imageUrl}
              alt={plan.name}
              style={
                {
                  objectFit: "cover"
                }
              }
            />
          )}
        </div>
        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{plan.name}</h2>
          <p className="text-primary text-lg overflow-hidden text-ellipsis text-nowrap">{formatter.format(Number(plan.price))}</p>
          <Button className="w-full mt-3" variant="secondary">Agendar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlanItem;
