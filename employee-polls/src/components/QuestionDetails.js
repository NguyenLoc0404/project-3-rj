import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import NotFound from "./NotFound";
import "../css/question-details.css";

const QuestionDetails = () => {
  const { id } = useParams();
  const question = useSelector((state) => state.questions[id]);
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(null); // Local state for selected option
  const [submitted, setSubmitted] = useState(false); // State to track submission

  if (!question) {
    return <NotFound />;
  }

  const hasVoted = users[authUser].answers[id];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const handleVote = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption && !hasVoted) {
      dispatch(handleAnswerQuestion(id, selectedOption));
      setSubmitted(true);
    }
  };

  return (
    <div className="container qs-content">
      <p>Poll By {users[question.author].name}</p>
      <img
        src={require(`../images/${users[question.author].name}.png`)}
        alt={`Avatar of ${users[question.author].name}`}
      />
      <h3>Would You Rather</h3>
      <div className="qs-content-choose">
        {submitted || hasVoted ? (
          <div className="qs-content-choose-div">
            <div
              className="qs-content-footer-div"
              style={{ border: hasVoted === "optionOne" ? "2px solid green" : "" }}
            >
              <p>{question.optionOne.text}</p>
              <p>
                {question.optionOne.votes.length} out of {totalVotes} votes
              </p>
              <p>
                {((question.optionOne.votes.length / totalVotes) * 100).toFixed(
                  2
                )}
                %
              </p>
            </div>
            <div
              className="qs-content-footer-div"
              style={{ border: hasVoted === "optionTwo" ? "2px solid green" : ""}}
            >
              <p>{question.optionTwo.text}</p>
              <p>
                {question.optionTwo.votes.length} out of {totalVotes} votes
              </p>
              <p>
                {((question.optionTwo.votes.length / totalVotes) * 100).toFixed(
                  2
                )}
                %
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="qs-content-choose-div">
              <div className="qs-content-footer-div">
                <p>{question.optionOne.text}</p>
                <button
                  type="button"
                  className="btn btn-success button-style"
                  onClick={() => handleVote("optionOne")}
                  style={{
                    border: selectedOption === "optionOne" ? "2px solid green" : "",
                    pointerEvents: submitted ? "none" : "auto",
                  }}
                >
                  Choose Option One
                </button>
              </div>
              <div className="qs-content-footer-div">
                <p>{question.optionTwo.text}</p>
                <button
                  type="button"
                  className="btn btn-success button-style"
                  onClick={() => handleVote("optionTwo")}
                  style={{
                    border: selectedOption === "optionTwo" ? "2px solid green" : "",
                    pointerEvents: submitted ? "none" : "auto",
                  }}
                >
                  Choose Option Two
                </button>
              </div>
            </div>
            <div className="text-center">
              {selectedOption && (
                <button
                  type="button"
                  className="btn btn-primary text-center margin-top-10"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
