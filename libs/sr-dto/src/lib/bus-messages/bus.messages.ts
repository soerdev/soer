import { ANY_SERVICE, BusCommand, BusEvent, BusEmitter } from "@soer/mixed-bus";
import { DTO_EMPTY } from "../dto.helpers";
import { DtoPack, ERROR } from "../interfaces/dto.pack.interface";

export class CreateStartEvent extends BusEvent {}
export class CreateDoneEvent extends BusEvent {}
export class ReadDoneEvent extends BusEvent {}
export class UpdateDoneEvent extends BusEvent {}
export class DeleteDoneEvent extends BusEvent {}
export class ChangeDataEvent extends BusEvent {
    constructor(
        public override owner: BusEmitter = ANY_SERVICE,
        public override payload: DtoPack<any> = DTO_EMPTY,
        public override params = {}) {
        super();
    }
}

export class ErrorDataEvent extends BusEvent {
    constructor(
        public override owner: BusEmitter = ANY_SERVICE,
        public override payload: DtoPack<any> = {status: ERROR, items: []},
        public override params: {[key: string]: any} = {}) {
        super();
    }
}


export class CommandNew extends BusCommand {}
export class CommandEdit extends BusCommand {}
export class CommandView extends BusCommand {}
export class CommandCancel extends BusCommand {}

export class CommandRead extends BusCommand {}
export class CommandCreate extends BusCommand {}
export class CommandUpdate extends BusCommand {}
export class CommandDelete extends BusCommand {}
