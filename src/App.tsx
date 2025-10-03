import { useState } from "react";
import "./App.css";
import TestList from "./components/TestList";
import TestTaking from "./components/TestTaking";
import Results from "./components/Results";
import type { Test, UserAnswers } from "./types";

type Screen = "list" | "test" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("list");
  const [selectedTestId, setSelectedTestId] = useState<string>("");
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const handleSelectTest = (testId: string) => {
    setSelectedTestId(testId);
    fetch(`/tests/${testId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTest(data);
        setScreen("test");
      })
      .catch((err) => {
        console.error("Failed to load test:", err);
        alert("Hiba történt a teszt betöltésekor");
      });
  };

  const handleSubmitAnswers = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setScreen("results");
  };

  const handleRestart = () => {
    setUserAnswers({});
    setScreen("test");
  };

  const handleBackToList = () => {
    setScreen("list");
    setCurrentTest(null);
    setUserAnswers({});
    setSelectedTestId("");
  };

  const handleBackFromTest = () => {
    if (confirm("Biztosan visszalépsz? A válaszaid elvesznek.")) {
      handleBackToList();
    }
  };

  return (
    <div className="app">
      {screen === "list" && <TestList onSelectTest={handleSelectTest} />}

      {screen === "test" && currentTest && (
        <TestTaking test={currentTest} onSubmit={handleSubmitAnswers} onBack={handleBackFromTest} />
      )}

      {screen === "results" && currentTest && (
        <Results test={currentTest} answers={userAnswers} onRestart={handleRestart} onBackToList={handleBackToList} />
      )}
    </div>
  );
}

export default App;
