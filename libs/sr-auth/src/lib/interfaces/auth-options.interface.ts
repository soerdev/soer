import { BusEmitter } from "@soer/mixed-bus";

export interface AuthEmitter extends BusEmitter {
    sid: symbol;
    schema: {
        cookieApi: string;
        renewApi: string;
    };
  }