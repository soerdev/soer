import { CRUDBusEmitter } from "@soer/sr-dto";

export const WORKBOOK_TAG = 'workbook';
export const WORKBOOKS_TAG = 'workbooks';

const sid = Symbol(WORKBOOKS_TAG);
export const WORKBOOK_ID: CRUDBusEmitter = {sid, schema: { create: 'json/workbook', read: 'json/workbook/:wid', update: 'json/workbook', delete: 'json/workbook/:wid' } };
export const WORKBOOKS_ID: CRUDBusEmitter = {sid, schema: { create: 'json/workbook', read: 'json/workbook', update: 'json/workbook', delete: 'json/workbook/:wid' } };
