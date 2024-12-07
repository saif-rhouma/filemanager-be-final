import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pc from 'picocolors';
import httpLogger from 'morgan';

import environment from './configs/environment';
import Router from './router';

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.app.use(cors({ origin: '*' }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use(httpLogger('dev', { skip: (_req, _res) => environment.isTest }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    // this.app.use(
    //   cors({
    //     credentials: true,
    //     origin: '*',
    //     methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    //   })
    // );
  }

  public start() {
    this._setupRoutes();
    this._listen();
  }

  private _setupRoutes() {
    Router.create(this.app);
  }

  private _listen() {
    const { PORT, NODE_ENV } = environment;
    this.app.listen(PORT, () => {
      console.log(
        pc.inverse(
          pc.cyanBright(
            `Server is Running on port : ${pc.red(PORT)}! | Execution Environment : ${pc.red(NODE_ENV.toLocaleUpperCase())}`
          )
        )
      );
    });
  }
}

export default App;
