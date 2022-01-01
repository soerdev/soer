export const WORKBOOK_TAG = 'workbook';
export const WORKBOOKS_TAG = 'workbooks';

export const WORKBOOK_ID = {sid: Symbol(WORKBOOK_TAG), create: 'json/workbook', read: 'json/workbook/:wid', update: 'json/workbook', delete: 'json/workbook/:wid'};
export const WORKBOOKS_ID = {sid: Symbol(WORKBOOKS_TAG), create: 'json/workbook', read: 'json/workbook', update: 'json/workbook', delete: 'json/workbook/:wid'};
