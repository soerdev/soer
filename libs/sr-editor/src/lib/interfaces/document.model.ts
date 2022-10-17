export interface TextBlock {
    type: 'markdown' | 'test' | 'presentation',
    text: string;
}
export interface WorkbookModel {
    id?: number|null,
    question: string,
    text?: string,
    blocks: TextBlock[]

}

export const EMPTY_WORKBOOK: WorkbookModel = {
    id: null,
    question: '',
    blocks: [{text: '', type: 'markdown'}]
}