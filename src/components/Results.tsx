import type { Test, UserAnswers } from "../types";

interface ResultsProps {
  test: Test;
  answers: UserAnswers;
  onRestart: () => void;
  onBackToList: () => void;
}

export default function Results({ test, answers, onRestart, onBackToList }: ResultsProps) {
  const results = test.questions.map((question) => ({
    question,
    userAnswer: answers[question.id],
    isCorrect: answers[question.id] === question.correctAnswer,
  }));

  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = test.questions.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="results">
      <div className="results-header">
        <h1>Eredmények</h1>
        <div className="score">
          <div className="score-circle">
            <span className="score-number">{percentage}%</span>
          </div>
          <p className="score-text">
            {correctCount} helyes válasz {totalCount}-ból
          </p>
        </div>
      </div>

      <div className="results-list">
        {results.map(({ question, userAnswer, isCorrect }) => (
          <div key={question.id} className={`result-card ${isCorrect ? "correct" : "incorrect"}`}>
            <div className="result-header">
              <span className="result-icon">{isCorrect ? "✓" : "✗"}</span>
              <span className="question-number">{question.id}. kérdés</span>
            </div>

            <p className="question-text">{question.question}</p>

            {question.image && (
              <div className="question-image">
                <img src={question.image} alt={`Question ${question.id} illustration`} />
              </div>
            )}

            <div className="answer-info">
              <div className="user-answer">
                <strong>Te:</strong> {userAnswer || "Nem válaszoltál"}
                {userAnswer && ` - ${question.options.find((o) => o.label === userAnswer)?.text}`}
              </div>

              {!isCorrect && (
                <div className="correct-answer">
                  <strong>Helyes válasz:</strong> {question.correctAnswer}
                  {" - "}
                  {question.options.find((o) => o.label === question.correctAnswer)?.text}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <button onClick={onRestart} className="restart-button">
          Újra próbálom
        </button>
        <button onClick={onBackToList} className="back-button">
          Vissza a listához
        </button>
      </div>
    </div>
  );
}
