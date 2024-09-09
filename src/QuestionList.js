import React, { useEffect, useState } from "react";
import questionData from "./questionData.json";
import submissionData from "./submissionData.json";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [categories, setCategories] = useState([]);
  const [questionListData, setQuestionListData] = useState([]);

  // const fetchCategories = async () => {
  //   const rawData = await fetch(QUESTIONS_API_BASE_URL);
  //   const jsonData = await rawData.json();
  //   setCategories(jsonData);
  // };

  const createCategories = (questionData) => {
    let allCategories = [];
    for (let question of questionData) {
      let currentCategory = question.category;
      if (!allCategories.includes(currentCategory)) {
        allCategories.push(currentCategory);
      }
    }
    setCategories(allCategories);
  };

  useEffect(() => {
    setQuestionListData(questionData);
    createCategories(questionData);
  }, []);

  return (
    <>
      {categories.map((category) => {
        return (
          <div className="category">
            <h2>{category}</h2>
            {questionListData
              .filter((ele) => {
                return ele.category === category;
              })
              .map(({ name, id, category }) => {
                let findStatus =
                  submissionData
                    .find((ele) => {
                      return ele.questionId === id;
                    })
                    ?.status.toLowerCase() || "unattempted";

                return (
                  <div className="question">
                    <div className={`status + ${findStatus}`}></div>
                    <div>{name}</div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </>
  );
}
