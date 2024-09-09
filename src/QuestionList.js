import React, { useEffect, useState } from "react";
import questionData from "./questionData.json";
import submissionData from "./submissionData.json";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [categories, setCategories] = useState({});
  const [questionListData, setQuestionListData] = useState([]);

  // const fetchCategories = async () => {
  //   const rawData = await fetch(QUESTIONS_API_BASE_URL);
  //   const jsonData = await rawData.json();
  //   setCategories(jsonData);
  // };

  useEffect(() => {
    setQuestionListData(questionData);
    console.log(submissionData);
  }, []);

  return (
    <>
      {questionListData.map(({ id, name, category }) => {
        if (categories) return <div>{name}</div>;
      })}
    </>
  );
}

/*
{

}
*/
