import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import '../css/new-question.css'; 

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h3 className="mb-4">Would You Rather</h3>
      <p className="mb-4">Create Your Own Poll</p>
      <form onSubmit={handleSubmit} className="d-flex flex-column w-100 align-items-center">
        <div className="mb-3 w-80">
          <label className="form-label">First Option</label>
          <input
            className="form-control"
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter Option One Text Here"
          />
        </div>
        <div className="mb-3 w-80">
          <label className="form-label">Second Option</label>
          <input
            className="form-control"
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter Option Two Text Here"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!optionOneText || !optionTwoText}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
