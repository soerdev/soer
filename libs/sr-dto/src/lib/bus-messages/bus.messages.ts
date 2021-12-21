import { ANY_SERVICE, BusCommand, BusEvent, BusOwner } from "@soer/mixed-bus";
import { DtoPack, ERROR, OK } from "../interfaces/dto.pack.interface";

export class CreateStartEvent extends BusEvent {}
export class CreateDoneEvent extends BusEvent {}
export class ReadDoneEvent extends BusEvent {}
export class UpdateDoneEvent extends BusEvent {}
export class DeleteDoneEvent extends BusEvent {}
export class ChangeDataEvent extends BusEvent {
    constructor(
        public override owner: BusOwner = ANY_SERVICE,
        public override result: DtoPack<any> = {status: OK, items: []},
        public override params = {}) {
        super();
    }
}

export class ErrorDataEvent extends BusEvent {
    constructor(
        public override owner: BusOwner = ANY_SERVICE,
        public override result: DtoPack<any> = {status: ERROR, items: []},
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
