import { BusError, BusMessage } from "./interfaces/mixed-bus.interface";

export function isBusMessage(message: BusMessage|BusError): message is BusMessage {
    return (message as BusMessage).result !== undefined;
  }