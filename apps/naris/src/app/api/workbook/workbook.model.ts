export interface WorkbookModel {
    id?: number|null,
    question: string,
    text: string
}

export const EMPTY_WORKBOOK: WorkbookModel = {
    id: null,
    question: '',
    text: ''
}