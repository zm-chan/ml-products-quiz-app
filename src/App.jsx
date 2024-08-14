import { useState } from "react";
import products from "./data";
import { useRef } from "react";

const buttonGeneralClassName =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

const buttonVariants = {
  default: "bg-yellow-600 hover:bg-yellow-600/90 text-white",
  outline:
    "border border-yellow-600 bg-transparent text-yellow-600 hover:bg-yellow-600 hover:text-white",
  secondary: "bg-fuchsia-500 text-white hover:bg-fuchsia-500/80",
};

const numOfQuestions = 5;
const numOfProducts = products.length;

function randomNumberGenerator(range, length) {
  const uniqueArray = [];

  while (uniqueArray.length < length) {
    if (uniqueArray.length === 0) {
      uniqueArray.push(Math.floor(Math.random() * range));
      continue;
    }

    let tempNum = Math.floor(Math.random() * range);
    while (uniqueArray.includes(tempNum)) {
      tempNum = Math.floor(Math.random() * range);
    }
    uniqueArray.push(tempNum);
  }

  return uniqueArray;
}

function randomQuestionsGenerator() {
  const questionsIndex = randomNumberGenerator(numOfProducts, numOfQuestions);

  const questions = questionsIndex.map((questionIndex) => {
    return products[questionIndex];
  });

  return questions;
}

function App() {
  const [questions, setQuestions] = useState(randomQuestionsGenerator());
  const [hideNumber, setHideNumber] = useState(3);
  const hideNumberArraysRef = useRef([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [errorStatus, setErrorStatus] = useState([]);

  function handleQuestions() {
    setQuestions(randomQuestionsGenerator());
    setHideNumber(3);
    setCheckAnswers(false);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleHint() {
    if (hideNumber === 1) {
      return;
    }

    setHideNumber((prevNumber) => {
      return prevNumber - 1;
    });
  }

  function handleCheckAnswer(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const errorStatusArray = questions.map((question) => {
      const { item, vipRM, retailRM } = question;

      return vipRM === +formData.get(`${item}-vip`) &&
        retailRM === +formData.get(`${item}-retail`)
        ? "✅"
        : "❌";
    });

    setHideNumber(1);
    setCheckAnswers(true);
    setErrorStatus(errorStatusArray);
  }

  return (
    <main className="h-full bg-fuchsia-100 p-4 lg:h-screen">
      <h1 className="text-center text-4xl font-bold text-fuchsia-700">
        Michelle Lazar Products Quiz App
      </h1>
      <div className="mt-9 grid gap-6 lg:grid-cols-2">
        <article className="overflow-x-scroll rounded-xl bg-white p-5 shadow-xl lg:col-span-1">
          <table className="w-full">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-yellow-600/50 [&_th]:p-2">
                <th>No.</th>
                <th>Item</th>
                <th>Volume</th>
                <th>VIP Price (RM)</th>
                <th>Retail Price (RM)</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {questions.map((question, i) => {
                let { item, volume, vipRM, retailRM } = question;

                vipRM = question.vipRM.toString().split("");
                retailRM = question.retailRM.toString().split("");

                // console.log(item, volume);

                if (hideNumber === 3) {
                  vipRM = vipRM.map(() => "X");
                  retailRM = retailRM.map(() => "X");
                }

                if (hideNumber === 2) {
                  if (vipRM.length === 3) {
                    const vipRandomNumbers = randomNumberGenerator(
                      3,
                      hideNumber,
                    );

                    hideNumberArraysRef.current[i] = [vipRandomNumbers];

                    vipRM[vipRandomNumbers[0]] = "X";
                    vipRM[vipRandomNumbers[1]] = "X";
                  } else if (vipRM.length === 2) {
                    const vipRandomNumbers = randomNumberGenerator(
                      2,
                      hideNumber - 1,
                    );

                    hideNumberArraysRef.current[i] = [vipRandomNumbers];

                    vipRM[vipRandomNumbers[0]] = "X";
                  }

                  if (retailRM.length === 3) {
                    const retailRandomNumbers = randomNumberGenerator(
                      3,
                      hideNumber,
                    );

                    hideNumberArraysRef.current[i].push(retailRandomNumbers);

                    retailRM[retailRandomNumbers[0]] = "X";
                    retailRM[retailRandomNumbers[1]] = "X";
                  } else if (retailRM.length === 2) {
                    const retailRandomNumbers = randomNumberGenerator(
                      2,
                      hideNumber - 1,
                    );

                    hideNumberArraysRef.current[i].push(retailRandomNumbers);

                    retailRM[retailRandomNumbers[0]] = "X";
                  }
                }
                if (hideNumber === 1) {
                  if (vipRM.length === 3) {
                    const nextVipRandomNumber = randomNumberGenerator(
                      2,
                      hideNumber,
                    );

                    vipRM[
                      hideNumberArraysRef.current[i][0][nextVipRandomNumber[0]]
                    ] = "X";
                  } else if (vipRM.length === 2) {
                    vipRM[hideNumberArraysRef.current[i][0]] = "X";
                  }

                  if (retailRM.length === 3) {
                    const nextRetailRandomNumber = randomNumberGenerator(
                      2,
                      hideNumber,
                    );

                    retailRM[
                      hideNumberArraysRef.current[i][1][
                        nextRetailRandomNumber[0]
                      ]
                    ] = "X";
                  } else if (retailRM.length === 2) {
                    retailRM[hideNumberArraysRef.current[i][1]] = "X";
                  }
                }

                if (checkAnswers) {
                  vipRM = question.vipRM.toString().split("");
                  retailRM = question.retailRM.toString().split("");
                }

                return (
                  <tr
                    key={i}
                    className="border-b transition-colors hover:bg-yellow-600/50 [&_td]:p-2 [&_td]:text-center"
                  >
                    <td>{i + 1}</td>
                    <td>{item}</td>
                    <td>{volume}</td>
                    <td>{vipRM.join("")}</td>
                    <td>{retailRM.join("")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={handleHint}
            className={
              buttonGeneralClassName +
              " " +
              buttonVariants.outline +
              " " +
              "mt-3"
            }
          >
            {hideNumber === 3
              ? "Hint"
              : hideNumber === 2
                ? "More Hint"
                : "No more hint ❌"}
          </button>
        </article>
        <article className="rounded-xl bg-white p-5 shadow-xl lg:col-span-1">
          <form
            action=""
            onSubmit={handleCheckAnswer}
            className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 sm:space-y-0"
          >
            {questions.map((question, i) => {
              const { item, volume } = question;

              return (
                <div key={i} className="space-y-1">
                  <div className="space-x-3">
                    <span className="font-medium">{item}</span>
                    <span>{volume}ml</span>
                    <span>{checkAnswers && errorStatus[i]}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <label className="col-span-2">VIP Price (RM)</label>
                    <input
                      type="text"
                      name={`${item}-vip`}
                      className="col-span-1 rounded border border-yellow-600 p-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-600"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <label className="col-span-2">Retail Price (RM)</label>
                    <input
                      type="text"
                      name={`${item}-retail`}
                      className="col-span-1 rounded border border-yellow-600 p-1 focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-600"
                    />
                  </div>
                </div>
              );
            })}
            <button
              type="submit"
              className={
                buttonGeneralClassName +
                " " +
                buttonVariants.default +
                " " +
                "self-center"
              }
            >
              Check Answer
            </button>
          </form>
        </article>
        <button
          onClick={handleQuestions}
          className={
            buttonGeneralClassName +
            " " +
            buttonVariants.secondary +
            " " +
            "xs:justify-self-start"
          }
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default App;
