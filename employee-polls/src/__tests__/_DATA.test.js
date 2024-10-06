import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL: `${process.env.PUBLIC_URL}/images/user.png`,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
};

beforeEach(() => {
  global.users = { ...mockUsers }; 
  global.questions = {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      author: "author1",
      timestamp: 1467166872634,
      optionOne: {
        votes: [],
        text: "Option One Text",
      },
      optionTwo: {
        votes: [],
        text: "Option Two Text",
      },
    },
  }; 
});


describe("_saveQuestion", () => {
  it("should return the saved question and all expected fields when passed correctly formatted data", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "author1",
    };

    const result = await _saveQuestion(question);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");
    expect(result).toHaveProperty("author", "author1");
  });

  it("should return an error if incorrect data is passed", async () => {
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "Option Two",
      author: "author1",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true when correctly formatted data is passed", async () => {
    const answerData = {
      authedUser: "sarahedo", 
      qid: "8xf0y6ziyjabvozdd253nd", 
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(answerData);
    expect(result).toEqual(true);

    expect(global.users[answerData.authedUser].answers).toHaveProperty(answerData.qid, answerData.answer);
  });

  it("should return an error if incorrect data is passed", async () => {
    const invalidAnswerData = {
      authedUser: "sarahedo", 
      qid: "", 
      answer: "optionOne",
    };

    await expect(_saveQuestionAnswer(invalidAnswerData)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});


