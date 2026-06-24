import { useState } from "react";

const SAFETY_KEYWORDS = ["kill", "suicide", "harm", "illegal", "weapon", "drug", "steal", "fraud", "cheat", "sex"];

function isSafe(text) {
  const lower = text.toLowerCase();
  return !SAFETY_KEYWORDS.some((kw) => lower.includes(kw));
}

export default function DecisionPanel() {
  const [dilemma, setDilemma] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!dilemma.trim()) return;
    if (!isSafe(dilemma)) {
      setError("This topic falls outside the scope of this assistant. Please ask about everyday decisions.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const prompt = `You are a calm, ethical daily life advisor. A user is facing this decision or situation:

"${dilemma}"

Respond ONLY with a JSON object — no markdown, no explanation outside the JSON. Format:
{
  "summary": "one sentence framing of the decision",
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con 1", "con 2", "con 3"],
  "recommendation": "a clear, calm 1-2 sentence recommendation",
  "considerations": ["consideration 1", "consideration 2"]
}

Keep each item concise (under 12 words). Be practical, grounded, and non-judgmental. Never recommend anything unethical, illegal, or harmful.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setError("Could not analyze — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel decision-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-icon decision-icon">⚖</span>
          Decision Helper
        </h2>
      </div>

      <p className="panel-desc">Describe a decision you're weighing. Get a structured, calm breakdown.</p>

      <textarea
        className="decision-input"
        placeholder="e.g. Should I take the new job offer? It pays more but means longer commute…"
        value={dilemma}
        onChange={(e) => setDilemma(e.target.value)}
        rows={3}
      />

      <button className="analyze-btn" onClick={analyze} disabled={loading || !dilemma.trim()}>
        {loading ? "Analyzing…" : "Analyze Decision"}
      </button>

      {error && <div className="decision-error">{error}</div>}

      {result && (
        <div className="decision-result">
          <p className="result-summary">{result.summary}</p>

          <div className="pros-cons-grid">
            <div className="pros-col">
              <h3 className="col-label pros-label">For it</h3>
              <ul className="decision-list">
                {result.pros.map((p, i) => (
                  <li key={i} className="decision-li pros-li">{p}</li>
                ))}
              </ul>
            </div>
            <div className="cons-col">
              <h3 className="col-label cons-label">Against it</h3>
              <ul className="decision-list">
                {result.cons.map((c, i) => (
                  <li key={i} className="decision-li cons-li">{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {result.considerations?.length > 0 && (
            <div className="considerations">
              <h3 className="col-label">Also consider</h3>
              <ul className="decision-list">
                {result.considerations.map((c, i) => (
                  <li key={i} className="decision-li consider-li">{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="recommendation-box">
            <span className="rec-label">Recommendation</span>
            <p className="rec-text">{result.recommendation}</p>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="decision-placeholder">
          <span className="placeholder-icon">💡</span>
          <p>Your structured breakdown will appear here</p>
        </div>
      )}
    </section>
  );
}
