import type { Context } from "@oak/oak/context";
import { User } from "../../../db/entities/user.ts";

type DeactivateContext = Context & {
  params: {
    id: string;
  };
};

export async function deactivate(ctx: DeactivateContext) {
  const id = Number(ctx.params.id);
  ctx.assert(!isNaN(id), 400, `Id ${ctx.params.id} must be a valid number`);

  const user = await User.findOne({
    where: { id },
    attributes: ["id"],
  });

  ctx.assert(user, 404, `User with id '${id}' does not exists.`);

  await user.update({ isActive: false });
  ctx.response.status = 204;
}
