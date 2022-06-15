import { ANY_SERVICE, BusEmitter, BusEvent } from "@soer/mixed-bus";
import { VideoIdModel } from "../personal-activity.service";

export class WatchVideoEvent extends BusEvent {
    constructor(
        public override  owner: BusEmitter = ANY_SERVICE,
        public video: VideoIdModel
        ) {
        super(owner, video)
    }
}