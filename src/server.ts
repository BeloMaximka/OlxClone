import { Application } from "@oak/oak/application";
import { environmentVariables } from "./config/environment-variables.ts";
import { rootRouter } from "./root-router.ts";

const cert = await Deno.readTextFile("./cert/cert.pem");
const key = await Deno.readTextFile("./cert/key.pem");

const app = new Application();
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

console.log(`Server is listening at port ${environmentVariables.port}`);
app.listen({
  port: environmentVariables.port,
  cert,
  key,
  keyFormat: "pem",
  secure: true,
});
