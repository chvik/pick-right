import { useState } from "react";
import type { Test, UserAnswers } from "../types";

interface TestTakingProps {
  test: Test;
  onSubmit: (answers: UserAnswers) => void;
  onBack: () => void;
}

export default function TestTaking({ test, onSubmit, onBack }: TestTakingProps) {
  const [answers, setAnswers] = useState<UserAnswers>({});

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < test.questions.length) {
      if (!confirm("Nem válaszoltál meg minden kérdést. Biztosan beadod?")) {
        return;
      }
    }
    onSubmit(answers);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="test-taking">
      <div className="test-header">
        <button onClick={onBack} className="back-button">
          ← Vissza
        </button>
        <h1>{test.title}</h1>
        <div className="progress">
          Megválaszolva: {answeredCount} / {test.questions.length}
        </div>
      </div>

      <div className="questions">
        {test.questions.map((question) => (
          <div key={question.id} className="question-card">
            <h3>
              {question.id}. {question.question}
            </h3>
            {question.image && (
              <div className="question-image">
                <img src={question.image} alt={`Question ${question.id} illustration`} />
              </div>
            )}
            <div className="options">
              {question.options.map((option) => (
                <label
                  key={option.label}
                  className={`option ${answers[question.id] === option.label ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.label}
                    checked={answers[question.id] === option.label}
                    onChange={() => handleAnswerChange(question.id, option.label)}
                  />
                  <span className="option-label">({option.label})</span>
                  <span className="option-text">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="submit-section">
        <button onClick={handleSubmit} className="submit-button">
          Beadás
        </button>
      </div>
    </div>
  );
}
