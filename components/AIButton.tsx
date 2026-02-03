import { useState } from "react";

type AIType = "summary" | "improve" | "tags";

export const useAI = () => {
  const [loading, setLoading] = useState(false);

  const runAI = async (
    type: AIType,
    text: string,
    onResult: (result: string) => void
  ) => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ text, type }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.result) onResult(data.result);
    } finally {
      setLoading(false);
    }
  };

  return { runAI, loading };
};
