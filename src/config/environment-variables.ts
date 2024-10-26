import "@std/dotenv/load";

function getEnvVariableString(name: string) {
  const value = Deno.env.get(name);
  if (!value) {
    throw Error(`Missing ${name} env variable`);
  }
  return value;
}

function getEnvVariableNumber(name: string) {
  const value = Number(Deno.env.get(name));
  if (isNaN(value)) {
    throw Error(`Missing ${name} env variable`);
  }
  return value;
}

export const environmentVariables = {
  jwt: {
    accessSecret: getEnvVariableString("JWT_ACCESS_SECRET"),
    refreshSecret: getEnvVariableString("JWT_ACCESS_SECRET"),
  },
  port: getEnvVariableNumber("PORT"),
};
