import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../css/poll-card.css";
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm} | ${month}/${day}/${year}`;
};

const PollCard = ({ id }) => {
  const question = useSelector((state) => state.questions[id]);
  
  const author = useSelector((state) => state.users[question.author]);

  if (!question || !author) {
    return <p>Question or Author not found</p>;
  }

  return (
    <div className='poll-card'>
      <div className='poll-author'>
        <p className='fw-bold'>{author.name}</p>
        <p>{formatTimestamp(question.timestamp)}</p>
      </div>
      <div className='poll-details'>
        <Link to={`/questions/${id}`}>
          <button type="button" className="btn btn-outline-success">Show</button>
        </Link>
      </div>
    </div>
  );
};

export default PollCard;
