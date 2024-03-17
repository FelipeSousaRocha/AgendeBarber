"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import fs from "fs";

export const cancelBooking = async (bookingId: string) => {
  try {
    // Deleta o agendamento do banco de dados
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    // Revalida os caminhos
    revalidatePath("/");
    revalidatePath("/bookings");
  } catch (error) {
    if (error instanceof Error) {
      // Registra o erro em um arquivo de log
      const logMessage = `Erro ao cancelar o agendamento com ID ${bookingId}: ${error.message}\n`;
      fs.appendFileSync("error.log", logMessage);

      // Se desejar, você pode rethrow o erro para propagá-lo para cima na pilha de chamadas
      throw error;
    } else {
      // Se o erro não for uma instância de Error, registre uma mensagem genérica de erro
      const logMessage = `Erro ao cancelar o agendamento com ID ${bookingId}: erro desconhecido\n`;
      fs.appendFileSync("error.log", logMessage);
    }
  }
};
