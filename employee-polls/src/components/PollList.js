import React from "react";
import PollCard from "./PollCard";
import "../css/poll-list.css";
import { useSelector } from "react-redux";
const PollList = ({ pollIds }) => {
  const questions = useSelector((state) => state.questions);
  if (!pollIds || !Array.isArray(pollIds) || pollIds.length === 0) {
    return <p>No polls available.</p>;
  }
  const sortedPollIds = pollIds.sort((a, b) => {
    return questions[b].timestamp - questions[a].timestamp;
  });
  return (
    <div className="row poll-list-div">
      {sortedPollIds.map((id) => (
        <div key={id} className="col-3">
          <PollCard id={id} />
        </div>
      ))}
    </div>
  );
};

export default PollList;
