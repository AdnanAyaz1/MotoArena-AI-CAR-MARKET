"use server";

import { handleActionError, serverActionResponse } from "@/lib/action-utils";
import { db } from "@/lib/prismadb";

export async function updateUserProfile(userId: string, data: { username: string; imageUrl: string }) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        username: data.username,
        imageUrl: data.imageUrl,
      },
    });

    return serverActionResponse("Profile updated successfully", true, 200, updatedUser);
  } catch (error) {
    return handleActionError(error);
  }
}
