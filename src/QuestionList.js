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

  const createCategories = (questionData) => {
    let allCategories = {};
    for (let question of questionData) {
      let currentCategory = question.category;
      if (!allCategories[currentCategory]) {
        allCategories[currentCategory] = true;
      }
    }
    setCategories(allCategories);
  };

  useEffect(() => {
    setQuestionListData(questionData);
    createCategories(questionData);
    console.log(categories);
    console.log(questionListData);
    console.log(submissionData);
  }, []);

  return (
    <>
      {/* {questionListData.map(({ id, name, category }) => {
        return (
          <div className="question">
            <div>{name}</div>
            <div>{category}</div>
          </div>
        );
      })} */}
      {Object.keys(categories).map((category) => {
        return <div>{category}</div>;
      })}
    </>
  );
}

/*
{

}
*/
