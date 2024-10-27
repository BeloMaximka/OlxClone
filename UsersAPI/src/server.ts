import { Application } from "@oak/oak/application";
import { environmentVariables } from "./config/environment-variables.ts";
import { sequelize } from "./db/configuration/sequelize.ts";
import { rootRouter } from "./root-router.ts";

const app = new Application();

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

await sequelize.sync();

console.log(
  `Server is listening at https://localhost:${environmentVariables.port}`
);
app.listen({
  port: environmentVariables.port,
  cert: Deno.readTextFileSync("./cert/cert.pem"),
  key: Deno.readTextFileSync("./cert/key.pem"),
  keyFormat: "pem",
  secure: true,
});
