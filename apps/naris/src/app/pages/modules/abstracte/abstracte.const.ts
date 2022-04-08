import { CRUDBusEmitter } from "@soer/sr-dto";

export const WORKBOOK_TAG = 'workbook';
export const WORKBOOKS_TAG = 'workbooks';

export const WORKBOOK_ID: CRUDBusEmitter = {sid: Symbol(WORKBOOK_TAG), schema: { create: 'json/workbook', read: 'json/workbook/:wid', update: 'json/workbook', delete: 'json/workbook/:wid' } };
export const WORKBOOKS_ID: CRUDBusEmitter = {sid: Symbol(WORKBOOKS_TAG), schema: { create: 'json/workbook', read: 'json/workbook', update: 'json/workbook', delete: 'json/workbook/:wid' } };
