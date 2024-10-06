import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { addUserQuestion, addUserAnswer } from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authUser } = getState(); 

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authUser,
    }).then((question) => {
      dispatch(addQuestion(question)); 
      dispatch(addUserQuestion(question)); 
    });
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authUser } = getState();

    return _saveQuestionAnswer({
      authedUser: authUser,
      qid,
      answer,
    }).then(() =>
      {
        dispatch(answerQuestion({ authedUser: authUser, qid, answer }));
        dispatch(addUserAnswer({ authedUser: authUser, qid, answer }));
      }
    );
  };
}
