import { useEffect, useState } from "react";
import type { TestMetadata } from "../types";

interface TestListProps {
  onSelectTest: (testId: string) => void;
}

export default function TestList({ onSelectTest }: TestListProps) {
  const [tests, setTests] = useState<TestMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}tests/tests.json`)
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tests:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Betöltés...</div>;
  }

  return (
    <div className="test-list">
      <div className="hero">
        <img
          src="https://dka.oszk.hu/066900/066992/281_380_pix_Oldal_44_Kep_0001_nagykep.jpg"
          alt="Zrínyi Ilona"
          className="hero-image"
        />
        <h1>Pick Right</h1>
        <p>Válassz egy tesztet!</p>
      </div>

      <div className="test-cards">
        {tests.map((test) => (
          <div key={test.id} className="test-card" onClick={() => onSelectTest(test.id)}>
            <h2>{test.title}</h2>
            <p>{test.questionCount} kérdés</p>
            <button>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
}
