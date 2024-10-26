import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { environmentVariables } from "./config/environment-variables.ts";
import { authRouter } from "./routers/auth-router.ts";

const cert = await Deno.readTextFile("./cert/cert.pem");
const key = await Deno.readTextFile("./cert/key.pem");

const router = new Router();
router.use(["/api/auth"], authRouter.routes());
router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is listening at port ${environmentVariables.port}`);
app.listen({
  port: environmentVariables.port,
  cert,
  key,
  keyFormat: "pem",
  secure: true,
});
