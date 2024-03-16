"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    try {
      await cancelBooking(booking.id)

      toast.success("Agendamento cancelado!")
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleteLoading(false)
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="py-0 flex px-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit">
                {
                  isBookingConfirmed ? "Finalizado" : "Confirmado"
                }
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1 justify-center border-3 border-solid border-secondary">
              <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                locale: ptBR,
              }
              )}</p>
              <p className="text-2xl">{format(booking.date, "dd", {
                locale: ptBR,
              })}
              </p>
              <p className="text-sm">{format(booking.date, 'hh:mm')}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informacoes da reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/barbershop-map.png" fill alt={booking.barbershop.name} />
            <div className="w-[90%]  absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit my-3">
            {
              isBookingConfirmed ? "Finalizado" : "Confirmado"
            }
          </Badge>

          <Card>
            <CardContent className="p-3 gap-3 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">
                  {booking.service.name}
                </h2>
                <h3 className="text-primary text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", {
                  locale: ptBR
                })}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Horario</h3>
                <h4 className="text-sm">{format(booking.date, 'hh:mm')}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>

          {/* Botão para WhatsApp */}
          <Button
            variant="secondary"
            className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white border-none"
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?phone=NUMERO_DE_TELEFONE&text=Olá! Gostaria de confirmar minha reserva.`,
                "_blank"
              )
            }
          >
            <FontAwesomeIcon icon={faWhatsapp} size="lg" /> {/* Use o ícone do WhatsApp do FontAwesome */}
            Whatsapp
          </Button>

          <SheetFooter className="flex gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">Voltar</Button>
            </SheetClose>
            <Button disabled={!isBookingConfirmed || isDeleteLoading} className="w-full" variant="destructive" onClick={handleCancelClick}>
              {
                isDeleteLoading && (
                  <Loader2 className="mr-2 h-4 animate-spin" />
                )
              }
              Cancelar agendamento
            </Button>
          </SheetFooter>

        </div>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;
