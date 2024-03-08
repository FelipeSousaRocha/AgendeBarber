"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Booking, Service } from '@prisma/client'
import { Loader2, StarIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import { signIn, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../barbershops/_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../barbershops/[id]/_actions/save-booking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../barbershops/[id]/_actions/get-day-booking";

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {

  // Usar router do Next para direcionar para outra pagina
  const router = useRouter();

  // Obtenha os dados da sessão do usuário
  const { data } = useSession();

  // Variáveis de estado
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  // Modificar dia de agendamento
  useEffect(() => {

    if (!date) {
      return
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(date);

      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date])

  // Lidar com a seleção de data
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);  // Redefina a hora quando a data mudar
  };

  // Lidar com a seleção de hora
  const handleHourClick = (time: string) => {
    setHour(time)
  };

  // Lidar com o clique no botão de reserva
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      // Redirecione para o login do Google se o usuário não estiver autenticado
      return signIn("google")
    }
  };

  // Lidar com o envio do agendamento
  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    try {
      if (!hour || !date || !data?.user) {
        return
      }

      // Converta a string de hora para um objeto de data
      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      // Salve os detalhes do agendamento 
      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      // Feche a janela de agendamento
      setSheetIsOpen(false);

      // Resetar hora e data
      setHour(undefined);
      setDate(undefined);

      // Notificacao de agendamento feito
      toast("Agendamento realizado com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'ás' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push('/bookings'),
        },
      });

    } catch (error) {
      console.error(error);
    } finally {
      // Para de carregar o icone
      setSubmitIsLoading(false);
    }
  }

  // Gere a lista de horários disponíveis com base na data selecionada
  const timeList = useMemo(() => {
    if (!date) {
      return []
    }

    return generateDayTimeList(date).filter(time => {
      // Se houver algum agendamento em "dayBookings" com a hora e  minutos igual a time, nao incluir

      const timeHour = Number(time.split(':')[0]);
      const timeMinutes = Number(time.split(':')[1]);

      const booking = dayBookings.find(booking => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      })

      if (!booking) {
        return true
      }
      return false;

    })
  }, [date, dayBookings]);

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
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

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="ml-3"
                    variant="secondary"
                    onClick={handleBookingClick}>
                    Agendar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer agendamento</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {/* Mostrar lista de horarios se alguma data estiver selecionada */}
                  {
                    date && (
                      <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                        {timeList.map((time) => (
                          <Button onClick={() => handleHourClick(time)} key={time} variant={
                            hour === time ? 'default' : 'outline'
                          }
                            className="rounded-full">
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}


                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 gap-3 flex flex-col">
                        <div className="flex justify-between">
                          <h2 className="font-bold">
                            {service.name}
                          </h2>
                          <h3 className="text-primary text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                              locale: ptBR
                            })}</h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horario</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>

                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button onClick={handleBookingSubmit} disabled={(
                      !hour || !date
                    ) || submitIsLoading}>
                      {submitIsLoading && <Loader2 className="mr-2 h-4 animate-spin" />}
                      Confirmar agendamento
                    </Button>
                  </SheetFooter>

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

      </CardContent>
    </Card >
  );
}

export default ServiceItem;
