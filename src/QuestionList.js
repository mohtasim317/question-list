import React, { useEffect, useState } from "react";
import questionData from "./questionData.json";
import submittedData from "./submissionData.json";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [categories, setCategories] = useState([]);
  const [questionListData, setQuestionListData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);

  // const fetchData = async (url, hook) => {
  //   const rawData = await fetch(url);
  //   const jsonData = await rawData.json();
  //   hook(jsonData);
  // };

  const getStatus = (status) => {
    let result = "status ";
    switch (status) {
      case "PARTIALLY_CORRECT":
        return (result += "partially-correct");
      case "CORRECT":
        return (result += "correct");
      case "INCORRECT":
        return (result += "incorrect");
      default:
        return (result += "unattempted");
    }
  };

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

  const calculateCorrect = (category) => {
    let correct = 0;
    let total = 0;
    const allQuestions = questionListData.filter((ele) => {
      return ele.category === category;
    });

    allQuestions.forEach((question) => {
      let currentStatus = submissionData.find((ele) => {
        return ele.questionId === question.id;
      });

      if (currentStatus === undefined) {
        total++;
      } else {
        if (currentStatus.status === "CORRECT") {
          correct++;
          total++;
        } else {
          total++;
        }
      }
    });
    let result = `${correct} / ${total}`;

    return result;
  };

  useEffect(() => {
    setQuestionListData(questionData);
    setSubmissionData(submittedData);
    createCategories(questionData);
    // fetchData(QUESTIONS_API_BASE_URL, setQuestionListData);
    // fetchData(SUBMISSIONS_API_BASE_URL, setSubmissionData);
  }, []);

  return (
    <>
      {categories.map((category) => {
        return (
          <div className="category">
            <h2>
              {category} {calculateCorrect(category)}
            </h2>
            {questionListData
              .filter((ele) => {
                return ele.category === category;
              })
              .map(({ name, id, category }) => {
                let currentStatus = submissionData.find((ele) => {
                  return ele.questionId === id;
                });
                return (
                  <div className="question">
                    <div className={getStatus(currentStatus?.status)}></div>
                    <h3>{name}</h3>
                  </div>
                );
              })}
          </div>
        );
      })}
    </>
  );
}
