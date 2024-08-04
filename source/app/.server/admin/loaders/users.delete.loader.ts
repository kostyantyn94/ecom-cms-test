import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";

export async function deleteUserLoader({ params }: LoaderFunctionArgs) {
  const userId = params.id;

  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(userId, 10),
      },
    });
    return redirect(EAdminNavigation.users);
  } catch (error) {
    return json(
      { error: `Error deleting user: ${error.message}` },
      { status: 500 }
    );
  }
}
