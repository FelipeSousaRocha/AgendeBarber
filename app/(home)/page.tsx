import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import ServiceItem from "../_components/service-item";
import PlanItem from "./_components/plan-item"; // Importe o componente PlanItem
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  // Chamar prisma e pegar os serviços e planos
  const services = await db.service.findMany({});
  const plans = await db.plan.findMany({}); // Recupere os planos do banco de dados

  const session = await getServerSession(authOptions)

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Ola, Felipe</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        })}</p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Serviços</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Planos</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {plans.map((plan) => ( // Mapeie sobre os planos e renderize cada um
            <PlanItem key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

    </div>
  )
}
