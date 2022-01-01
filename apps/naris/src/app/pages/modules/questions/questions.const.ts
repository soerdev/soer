export const QUESTION_TAG = 'question';
export const QUESTIONS_TAG = 'questions';

export const QUESTIONS_ID =  {sid: Symbol(QUESTIONS_TAG), create: 'questions', read: 'questions', update: 'questions', delete: 'questions'};
export const QUESTION_ID = {sid: Symbol(QUESTION_TAG), create: 'questions', read: 'questions/:qid', update: 'questions/:qid', delete: 'questions/:qid'};
export const QUESTIONS_ALL_ID =  {sid: Symbol(QUESTIONS_TAG), create: 'questions', read: 'questions/all', update: 'questions', delete: 'questions'};
