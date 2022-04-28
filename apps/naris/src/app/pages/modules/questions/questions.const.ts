import { CRUDBusEmitter } from "@soer/sr-dto";

export const QUESTION_TAG = 'question';
export const QUESTIONS_TAG = 'questions';

const sid = Symbol(QUESTIONS_TAG);
export const QUESTIONS_ID: CRUDBusEmitter =  {sid, schema: { create: 'questions', read: 'questions', update: 'questions', delete: 'questions' } };
export const QUESTION_ID: CRUDBusEmitter = {sid, schema: { create: 'questions', read: 'questions/:qid', update: 'questions/:qid', delete: 'questions/:qid' } };
export const QUESTIONS_ALL_ID: CRUDBusEmitter =  {sid, schema: { create: 'questions', read: 'questions/all', update: 'questions', delete: 'questions' } };
