import { ptBR } from 'date-fns/locale';
import Header from '../_components/header';
import { format } from 'date-fns';
import Search from './_components/search';
import BookingItem from '../_components/booking-item';
import { db } from '../_lib/prisma';
import BarbershopCard from './_components/barbershop-card'; // Importe o componente BarbershopCard
import PlanItem from './_components/plan-item'; // Importe o componente PlanItem
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ServiceItem from '../_components/service-item';

export default async function Home() {

  // Consulta corrigida para recuperar as reservas do usuário logado
  const session = await getServerSession(authOptions);

  // Chamar prisma e pegar os planos
  const services = await db.service.findMany({});
  const plans = await db.plan.findMany({});

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          }
        },
        include: {
          service: true,
          barbershop: true,
        }
      })
      : Promise.resolve([])
  ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name && session.user.name.length <= 3 ? session.user.name : session.user.name?.split(" ")[0]}!` : 'Olá, vamos agendar seu corte hoje?'}
        </h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        })}</p>
      </div>



      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>

        {confirmedBookings.length > 0 && (
          <div className='px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
            {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
          </div>
        )}
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Barbearia</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Serviços populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {services.map((service) => (
            <ServiceItem barbershop={barbershops[0]} key={service.id} service={service} isAuthenticated={!!session?.user} />
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
