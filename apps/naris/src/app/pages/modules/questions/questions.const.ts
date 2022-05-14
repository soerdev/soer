import { BusKey } from "@soer/mixed-bus";

export const QUESTION_TAG = 'question';
export const QUESTIONS_TAG = 'questions';

const sid = Symbol(QUESTIONS_TAG);


export interface QuestionKey extends BusKey {
    qid: string;
}