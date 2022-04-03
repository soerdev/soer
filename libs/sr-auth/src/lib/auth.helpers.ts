import { BusMessage } from "@soer/mixed-bus";
import { map, Observable } from "rxjs";
import { EmptyJWTModel, JWTModel } from "./interfaces/jwt.models";
import { OK } from "@soer/sr-dto";

export function authUserInfo(messages$: Observable<BusMessage>): Observable<JWTModel> {
    return messages$.pipe(map( (data: BusMessage|null) => {
        let result: JWTModel = EmptyJWTModel;
        console.log('===>', data);
        if (data?.payload?.status === OK) {
            result = data?.payload.items.pop() as JWTModel;
        }
        return result;
    })
    );
}