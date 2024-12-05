import { cleanEnv, port, str } from 'envalid';

const environment = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port(),
});

export default environment;
