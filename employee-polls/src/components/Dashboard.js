import React from "react";
import { useSelector } from "react-redux";
import PollList from "./PollList";
import "../css/dash-board.css";

const Dashboard = ({ newQuestion = undefined }) => {
  // Đặt giá trị mặc định là false
  const questions = useSelector((state) => state.questions);
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);

  let answered = [];
  let unanswered = [];

  if (users[authUser]) {
    answered = Object.keys(users[authUser]?.answers);
    unanswered = Object.keys(questions).filter(
      (qid) => !answered.includes(qid)
    );
  }

  return (
    <div className="container">
      {(newQuestion|| newQuestion === undefined) && (
        <div className="new-questions-section">
          <h3>New Questions</h3>
          <PollList pollIds={unanswered} />
        </div>
      )}

      {(!newQuestion|| newQuestion === undefined)&& (
        <div className="done-questions-section">
          <h3>Done</h3>
          <PollList pollIds={answered} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
