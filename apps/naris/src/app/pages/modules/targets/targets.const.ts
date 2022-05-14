import { BusKey } from "@soer/mixed-bus";

export const TARGET_TAG = 'target';
export const TARGETS_TAG = 'targets';

export const DONE_PROGRESS = 100;
export const UNDONE_PROGRESS = 0;

export interface TargetKey extends BusKey {
    tid: string;
}

export interface TemplateKey extends BusKey {
    tid: string;
}