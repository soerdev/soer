import { BusMessage } from "@soer/mixed-bus";
import { DtoPack } from "./dto.pack.interface";

export interface CRUD {
    create(msg: BusMessage): Promise<DtoPack<any>>;
    read(msg: BusMessage): Promise<DtoPack<any>>;
    update(msg: BusMessage): Promise<DtoPack<any>>;
    delete(msg: BusMessage): Promise<DtoPack<any>>;
}
