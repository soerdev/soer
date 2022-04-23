import { BusEmitter, BusError, BusEvent, BusKey, BusMessage, BusMessageParams } from "./interfaces/mixed-bus.interface";

export function isBusMessage(message: BusMessage|BusError): message is BusMessage {
    return (message as BusMessage).payload !== undefined;
  }


export function busEmitterFactory(owner: BusEmitter, params: BusMessageParams): BusEmitter {
  if (typeof params === 'object' && Object.keys(params).length > 0) {
    const key: BusKey = JSON.parse(JSON.stringify(params));
    Object.freeze(key);
    return {...owner, key};
  }

  return owner;
}