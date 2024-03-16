"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"

export const cancelBooking = async (bookinId: string) => {
  return await db.booking.delete({
    where: {
      id: bookinId
    }
  });

  revalidatePath("/");
  revalidatePath('/bookings')
};