import "@std/dotenv/load";

function getString(name: string) {
  const value = Deno.env.get(name);
  if (!value) {
    throw Error(`Missing ${name} env variable`);
  }
  return value;
}

function getNumber(name: string) {
  const value = Number(Deno.env.get(name));
  if (isNaN(value)) {
    throw Error(`Missing ${name} env variable`);
  }
  return value;
}

export const environmentVariables = {
  jwt: {
    accessSecret: getString("JWT_ACCESS_SECRET"),
    refreshSecret: getString("JWT_ACCESS_SECRET"),
    operationSecret: getString("JWT_OPERATION_SECRET"),
  },
  
  port: getNumber("PORT"),

  hostname: getString("HOSTNAME"),

  mysql: {
    hostname: getString("MYSQL_HOSTNAME"),
    username: getString("MYSQL_USERNAME"),
    password: getString("MYSQL_PASSWORD"),
    database: getString("MYSQL_DATABASE"),
  },

  nodemailer: {
    user: getString("NODEMAILER_USER"),
    password: getString("NODEMAILER_PASSWORD"),
  },
};
