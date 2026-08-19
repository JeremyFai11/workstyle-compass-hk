"use client";

import { useEffect, useMemo, useState } from "react";
import {
  followUpQuestions,
  functionInfo,
  profiles,
  questions,
  type AxisKey,
  type FunctionKey,
  type Letter,
  type TypeCode,
} from "./quiz-data";

type Answers = Record<number, number>;
type Screen = "welcome" | "quiz" | "clarify" | "result";
type ClarityTone = "clear" | "moderate" | "open";

type SavedProgress = {
  answers: Answers;
  followUpPlan: number[] | null;
};

const STORAGE_KEY = "workstyle-adaptive-v2";
const LEGACY_STORAGE_KEY = "workstyle-answers-v1";
const allQuestions = [...questions, ...followUpQuestions];

const axisPairs: Array<{
  key: AxisKey;
  left: Letter;
  right: Letter;
  leftLabel: string;
  rightLabel: string;
  theme: string;
}> = [
  { key: "EI", left: "E", right: "I", leftLabel: "外向互動", rightLabel: "內向整理", theme: "能量來源" },
  { key: "SN", left: "S", right: "N", leftLabel: "實感資訊", rightLabel: "直覺脈絡", theme: "接收資訊" },
  { key: "TF", left: "T", right: "F", leftLabel: "邏輯準則", rightLabel: "價值關係", theme: "作出判斷" },
  { key: "JP", left: "J", right: "P", leftLabel: "計劃收結", rightLabel: "彈性探索", theme: "外在節奏" },
];

const scaleOptions = [
  { value: 0, short: "A 很像我", mobile: "A++" },
  { value: 1, short: "較像 A", mobile: "A+" },
  { value: 2, short: "兩者都有", mobile: "中間" },
  { value: 3, short: "較像 B", mobile: "B+" },
  { value: 4, short: "B 很像我", mobile: "B++" },
];

const axisNames: Record<AxisKey, string> = {
  EI: "能量來源 E / I",
  SN: "接收資訊 S / N",
  TF: "判斷準則 T / F",
  JP: "工作節奏 J / P",
};

function calculateResults(answers: Answers) {
  const letterScores: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const functionScores: Record<FunctionKey, number> = { Ne: 0, Ni: 0, Se: 0, Si: 0, Te: 0, Ti: 0, Fe: 0, Fi: 0 };
  const functionCounts: Record<FunctionKey, number> = { Ne: 0, Ni: 0, Se: 0, Si: 0, Te: 0, Ti: 0, Fe: 0, Fi: 0 };

  allQuestions.forEach((question, index) => {
    const response = answers[index];
    if (response === undefined) return;
    const aPoints = 4 - response;
    const bPoints = response;
    letterScores[question.aLetter] += aPoints;
    letterScores[question.bLetter] += bPoints;
    functionScores[question.aFn] += aPoints;
    functionScores[question.bFn] += bPoints;
    functionCounts[question.aFn] += 1;
    functionCounts[question.bFn] += 1;
  });

  const axes = axisPairs.map((pair) => {
    const total = letterScores[pair.left] + letterScores[pair.right];
    const leftPercent = total ? Math.round((letterScores[pair.left] / total) * 100) : 50;
    const rightPercent = 100 - leftPercent;
    return { ...pair, leftPercent, rightPercent, winner: leftPercent >= rightPercent ? pair.left : pair.right };
  });

  const normalizedFunctions = (Object.keys(functionScores) as FunctionKey[]).reduce(
    (scores, key) => {
      scores[key] = functionCounts[key] ? (functionScores[key] / (functionCounts[key] * 4)) * 100 : 0;
      return scores;
    },
    {} as Record<FunctionKey, number>,
  );

  const stackWeights = [1, 0.76, 0.46, 0.24];
  const stackWeightTotal = stackWeights.reduce((sum, weight) => sum + weight, 0);
  const rankings = (Object.keys(profiles) as TypeCode[])
    .map((code) => {
      const dimensionFit = code.split("").reduce((sum, letter, index) => {
        const axis = axes[index];
        const fit = letter === axis.left ? axis.leftPercent : axis.rightPercent;
        return sum + fit;
      }, 0) / 4;
      const stackFit = profiles[code].stack.reduce(
        (sum, fn, index) => sum + normalizedFunctions[fn] * stackWeights[index],
        0,
      ) / stackWeightTotal;
      return { code, score: dimensionFit * 0.66 + stackFit * 0.34 };
    })
    .sort((a, b) => b.score - a.score);

  const functionRanking = (Object.keys(normalizedFunctions) as FunctionKey[])
    .map((key) => ({ key, score: Math.round(normalizedFunctions[key]) }))
    .sort((a, b) => b.score - a.score);

  const minimumAxisClarity = Math.min(...axes.map((axis) => Math.max(axis.leftPercent, axis.rightPercent)));
  const typeGap = rankings[0].score - rankings[1].score;
  let clarity: { label: string; tone: ClarityTone; detail: string } = {
    label: "仍在探索",
    tone: "open",
    detail: "部分取向或首兩個類型仍然接近，建議把第二可能類型一併閱讀，並用真實工作經歷再驗證。",
  };

  if (minimumAxisClarity >= 62 && typeGap >= 5) {
    clarity = {
      label: "較清晰",
      tone: "clear",
      detail: "四個維度與類型排序在這次作答中較一致，可把首選類型作為主要探索假設。",
    };
  } else if (minimumAxisClarity >= 57 && typeGap >= 2.5) {
    clarity = {
      label: "中等",
      tone: "moderate",
      detail: "整體方向已可辨認，但仍有一至兩部分較受情境影響，第二可能類型仍值得參考。",
    };
  }

  return {
    axes,
    best: rankings[0],
    second: rankings[1],
    functionRanking,
    closeAxes: axes.filter((axis) => Math.max(axis.leftPercent, axis.rightPercent) < 57),
    clarity,
    typeGap,
  };
}

function buildFollowUpPlan(answers: Answers) {
  const coreResult = calculateResults(answers);
  const targets = new Set<AxisKey>();

  coreResult.axes
    .filter((axis) => Math.max(axis.leftPercent, axis.rightPercent) < 60)
    .forEach((axis) => targets.add(axis.key));

  if (coreResult.typeGap < 4.5) {
    axisPairs.forEach((axis, index) => {
      if (coreResult.best.code[index] !== coreResult.second.code[index]) targets.add(axis.key);
    });
  }

  const observedTopFunctions = new Set(coreResult.functionRanking.slice(0, 2).map((item) => item.key));
  const theoreticalTopFunctions = profiles[coreResult.best.code].stack.slice(0, 2);
  const functionOverlap = theoreticalTopFunctions.filter((fn) => observedTopFunctions.has(fn)).length;
  if (functionOverlap === 0) {
    const differingAxis = axisPairs.find((_, index) => coreResult.best.code[index] !== coreResult.second.code[index]);
    const leastClearAxis = [...coreResult.axes].sort(
      (a, b) => Math.max(a.leftPercent, a.rightPercent) - Math.max(b.leftPercent, b.rightPercent),
    )[0];
    targets.add(differingAxis?.key ?? leastClearAxis.key);
  }

  // If clarification is needed, use at least two axes (8 questions). A single
  // four-item cluster would be too sensitive to one unusual workplace context.
  if (targets.size === 1) {
    const nextLeastClear = [...coreResult.axes]
      .sort((a, b) => Math.max(a.leftPercent, a.rightPercent) - Math.max(b.leftPercent, b.rightPercent))
      .find((axis) => !targets.has(axis.key));
    if (nextLeastClear) targets.add(nextLeastClear.key);
  }

  return followUpQuestions
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => targets.has(question.axis))
    .map(({ index }) => index)
    .slice(0, 16);
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [answers, setAnswers] = useState<Answers>({});
  const [followUpPlan, setFollowUpPlan] = useState<number[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");
  const activeQuestionIds = useMemo(
    () => [
      ...questions.map((_, index) => index),
      ...(followUpPlan ?? []).map((index) => questions.length + index),
    ],
    [followUpPlan],
  );
  const coreAnsweredCount = questions.reduce((count, _, index) => count + (answers[index] === undefined ? 0 : 1), 0);
  const activeAnsweredCount = activeQuestionIds.reduce(
    (count, questionId) => count + (answers[questionId] === undefined ? 0 : 1),
    0,
  );
  const coreComplete = coreAnsweredCount === questions.length;
  const assessmentComplete = coreComplete
    && followUpPlan !== null
    && activeAnsweredCount === activeQuestionIds.length;
  const result = useMemo(() => calculateResults(answers), [answers]);
  const targetAxes = useMemo(
    () => Array.from(new Set((followUpPlan ?? []).map((index) => followUpQuestions[index].axis))),
    [followUpPlan],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<SavedProgress>;
          if (parsed.answers && typeof parsed.answers === "object") setAnswers(parsed.answers);
          if (Array.isArray(parsed.followUpPlan)) {
            setFollowUpPlan(parsed.followUpPlan.filter((index) => Number.isInteger(index) && index >= 0 && index < followUpQuestions.length));
          }
        } else {
          const legacyAnswers = window.localStorage.getItem(LEGACY_STORAGE_KEY);
          if (legacyAnswers) setAnswers(JSON.parse(legacyAnswers) as Answers);
        }
      } catch {
        // Local progress is optional; the assessment still works without it.
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const progress: SavedProgress = { answers, followUpPlan };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in private browsing; keep the live session usable.
    }
  }, [answers, followUpPlan, hydrated]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const startQuiz = () => {
    if (assessmentComplete) {
      setScreen("result");
    } else if (coreComplete && followUpPlan === null) {
      const plan = buildFollowUpPlan(answers);
      setFollowUpPlan(plan);
      setScreen(plan.length > 0 ? "clarify" : "result");
    } else {
      const firstUnanswered = activeQuestionIds.find((questionId) => answers[questionId] === undefined);
      setCurrent(firstUnanswered ?? activeQuestionIds[0]);
      setScreen("quiz");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers({});
    setFollowUpPlan(null);
    setCurrent(0);
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectAnswer = (value: number) => {
    setAnswers((previous) => ({ ...previous, [current]: value }));
  };

  const goNext = () => {
    if (answers[current] === undefined) return;

    if (current === questions.length - 1 && followUpPlan === null) {
      const plan = buildFollowUpPlan(answers);
      setFollowUpPlan(plan);
      setScreen(plan.length > 0 ? "clarify" : "result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const currentPosition = activeQuestionIds.indexOf(current);
    if (currentPosition === activeQuestionIds.length - 1) {
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrent(activeQuestionIds[currentPosition + 1]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    const currentPosition = activeQuestionIds.indexOf(current);
    if (currentPosition <= 0) return;
    setCurrent(activeQuestionIds[currentPosition - 1]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continueClarifying = () => {
    if (!followUpPlan?.length) {
      setScreen("result");
      return;
    }
    const firstFollowUpId = questions.length + followUpPlan[0];
    const firstUnanswered = activeQuestionIds.find(
      (questionId) => questionId >= questions.length && answers[questionId] === undefined,
    );
    setCurrent(firstUnanswered ?? firstFollowUpId);
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareText = () => {
    const profile = profiles[result.best.code];
    const dimensions = result.axes.map((axis) => `${axis.winner} ${Math.max(axis.leftPercent, axis.rightPercent)}%`).join(" · ");
    const theoreticalStack = profile.stack.join(" → ");
    return `我的「職場型格」結果是 ${result.best.code}｜${profile.title}\n第二可能：${result.second.code}\n本次辨型清晰度：${result.clarity.label}\n四維傾向：${dimensions}\n類型理論序列（${result.best.code}）：${theoreticalStack}\n完成題數：${activeQuestionIds.length} 題\n\n這是非官方、非診斷性的自我探索結果。`;
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(shareText());
      setNotice("結果摘要已複製");
    } catch {
      setNotice("未能自動複製，請稍後再試");
    }
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "我的職場型格結果", text: shareText(), url: window.location.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyResult();
  };

  if (screen === "quiz") {
    const question = allQuestions[current];
    const selected = answers[current];
    const currentPosition = activeQuestionIds.indexOf(current);
    const isFollowUp = current >= questions.length;
    const followUpPosition = isFollowUp
      ? activeQuestionIds.slice(questions.length).indexOf(current) + 1
      : 0;
    const progress = Math.round((activeAnsweredCount / activeQuestionIds.length) * 100);
    const nextLabel = current === questions.length - 1 && followUpPlan === null
      ? "完成核心部分"
      : currentPosition === activeQuestionIds.length - 1
        ? "查看結果"
        : "下一題";
    return (
      <main className="quiz-page">
        <header className="quiz-header">
          <button className="brand brand-button" type="button" onClick={() => setScreen("welcome")} aria-label="返回歡迎頁">
            <span className="brand-mark" aria-hidden="true">職</span><span>職場型格</span>
          </button>
          <span className={`question-count ${isFollowUp ? "follow-up-count" : ""}`}>
            {isFollowUp ? `釐清題 ${followUpPosition} / ${followUpPlan?.length ?? 0}` : `核心題 ${current + 1} / ${questions.length}`}
          </span>
        </header>

        <div className="progress-wrap" aria-label={`已完成 ${activeAnsweredCount} 題，共 ${activeQuestionIds.length} 題`}>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <span>{progress}%</span>
        </div>

        <section className="question-shell" key={current}>
          <p className="question-kicker">
            <span>{isFollowUp ? "CLARIFYING SCENARIO" : "WORK SCENARIO"}</span>
            {isFollowUp ? " 精準辨型追問" : " 職場判斷情境"}
          </p>
          <h1 className="question-title">{question.prompt}</h1>
          <p className="question-help">請選擇較接近你「自然反應」的位置，而不是你認為最理想的做法。</p>

          <div className="option-pair">
            <div className="option-card option-a"><span>A</span><p>{question.a}</p></div>
            <div className="option-divider" aria-hidden="true">或</div>
            <div className="option-card option-b"><span>B</span><p>{question.b}</p></div>
          </div>

          <div className="scale-block">
            <div className="scale-guide"><span>傾向 A</span><i /><span>傾向 B</span></div>
            <div className="answer-scale" role="radiogroup" aria-label="選擇傾向程度">
              {scaleOptions.map((option) => (
                <button
                  className={`scale-choice ${selected === option.value ? "selected" : ""}`}
                  type="button"
                  role="radio"
                  aria-checked={selected === option.value}
                  aria-label={option.short}
                  key={option.value}
                  onClick={() => selectAnswer(option.value)}
                >
                  <span className="choice-dot" />
                  <span className="choice-desktop">{option.short}</span>
                  <span className="choice-mobile">{option.mobile}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-controls">
            <button className="text-button" type="button" disabled={currentPosition === 0} onClick={goBack}>← 上一題</button>
            <button className="primary-button next-button" type="button" disabled={selected === undefined} onClick={goNext}>
              {nextLabel} <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <p className="quiz-footnote">你的答案只會儲存在這部裝置。中途離開，下次仍可繼續。</p>
      </main>
    );
  }

  if (screen === "clarify") {
    return (
      <main className="clarify-page">
        <header className="quiz-header">
          <button className="brand brand-button" type="button" onClick={() => setScreen("welcome")} aria-label="返回歡迎頁">
            <span className="brand-mark" aria-hidden="true">職</span><span>職場型格</span>
          </button>
          <span className="question-count">核心 40 題已完成</span>
        </header>

        <section className="clarify-shell">
          <p className="question-kicker"><span>ADAPTIVE CHECK</span> 自適應釐清</p>
          <div className="clarify-icon" aria-hidden="true">↗</div>
          <h1>你的部分取向較接近，<br />再答幾題會更容易分辨。</h1>
          <p className="clarify-intro">
            系統只會針對仍然接近、首兩個類型互相拉扯，或認知功能排序未完全一致的部分追問；其他已清晰的維度不會重複測量。
          </p>

          <div className="clarify-panel">
            <div>
              <span>今次追加</span>
              <strong>{followUpPlan?.length ?? 0} 題</strong>
              <p>約需 {Math.max(2, Math.ceil((followUpPlan?.length ?? 0) / 2))} 分鐘</p>
            </div>
            <div>
              <span>集中釐清</span>
              <div className="axis-chips">
                {targetAxes.map((axis) => <b key={axis}>{axisNames[axis]}</b>)}
              </div>
            </div>
          </div>

          <div className="clarify-actions">
            <button className="primary-button" type="button" onClick={continueClarifying}>繼續精準辨型 <span aria-hidden="true">→</span></button>
            <button className="text-button" type="button" onClick={() => { setCurrent(questions.length - 1); setScreen("quiz"); }}>返回上一題</button>
          </div>
          <p className="clarify-note">追問只改善這套工具內的辨型一致性，不代表心理測量上的統計置信度。</p>
        </section>
      </main>
    );
  }

  if (screen === "result") {
    const profile = profiles[result.best.code];
    const secondProfile = profiles[result.second.code];
    return (
      <main className="result-page">
        {notice && <div className="toast" role="status">{notice}</div>}
        <header className="result-topbar">
          <button className="brand brand-button" type="button" onClick={() => setScreen("welcome")}>
            <span className="brand-mark" aria-hidden="true">職</span><span>職場型格</span>
          </button>
          <button className="text-button compact" type="button" onClick={restart}>重新測試</button>
        </header>

        <section className="result-hero">
          <div className="result-label">YOUR BEST-FIT PATTERN · 最吻合傾向</div>
          <div className="result-heading">
            <div>
              <p className="result-eyebrow">{profile.title}</p>
              <h1>{result.best.code}</h1>
            </div>
            <p>{profile.oneLiner}</p>
          </div>
          <div className="result-summary-grid">
            <p className="result-summary">{profile.summary}</p>
            <div className="second-match">
              <span>第二可能類型</span>
              <strong>{result.second.code}</strong>
              <p>{secondProfile.title} · 綜合吻合度接近</p>
            </div>
          </div>
          <div className={`clarity-card clarity-${result.clarity.tone}`}>
            <div>
              <span>本次辨型清晰度</span>
              <strong>{result.clarity.label}</strong>
            </div>
            <p>{result.clarity.detail}</p>
            <small>
              已完成 {activeQuestionIds.length} 題
              {(followUpPlan?.length ?? 0) > 0 ? `，包括 ${followUpPlan?.length} 題針對性追問` : "；核心答案已達停止條件，毋須追加題目"}
            </small>
          </div>
          <div className="share-actions">
            <button className="primary-button" type="button" onClick={shareResult}>分享結果 <span aria-hidden="true">↗</span></button>
            <button className="secondary-button" type="button" onClick={copyResult}>複製摘要</button>
          </div>
        </section>

        <section className="result-section dimensions-section">
          <div className="section-heading">
            <div><span>01</span><h2>你的四維傾向</h2></div>
            <p>百分比反映這次作答的相對傾向，不等於能力高低；清晰度也不是統計置信區間。</p>
          </div>
          <div className="dimension-list">
            {result.axes.map((axis) => (
              <div className="dimension-row" key={axis.key}>
                <div className="dimension-theme">{axis.theme}</div>
                <div className={`dimension-side ${axis.winner === axis.left ? "winner" : ""}`}>
                  <strong>{axis.left}</strong><span>{axis.leftLabel}</span><b>{axis.leftPercent}%</b>
                </div>
                <div className="dimension-bar" aria-label={`${axis.left} ${axis.leftPercent}%，${axis.right} ${axis.rightPercent}%`}>
                  <span style={{ width: `${axis.leftPercent}%` }} /><i />
                </div>
                <div className={`dimension-side right ${axis.winner === axis.right ? "winner" : ""}`}>
                  <b>{axis.rightPercent}%</b><span>{axis.rightLabel}</span><strong>{axis.right}</strong>
                </div>
              </div>
            ))}
          </div>
          {result.closeAxes.length > 0 && (
            <div className="close-note">
              <span>接近提示</span>
              你在 {result.closeAxes.map((axis) => axis.key.split("").join(" / ")).join("、")} 的取向較接近，情境和人生階段可能令結果浮動；第二類型因此特別值得一併閱讀。
            </div>
          )}
        </section>

        <section className="result-section functions-section">
          <div className="section-heading">
            <div><span>02</span><h2>認知功能傾向</h2></div>
            <p>以下是題目呈現出的相對使用傾向，並非功能能力測驗。</p>
          </div>
          <div className="function-layout">
            <div className="function-ranking">
              {result.functionRanking.map((fn, index) => (
                <div className="function-row" key={fn.key}>
                  <span className="function-rank">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{fn.key}</strong>
                  <div><b>{functionInfo[fn.key].name}</b><small>{functionInfo[fn.key].short}</small></div>
                  <div className="function-meter"><span style={{ width: `${fn.score}%` }} /></div>
                  <em>{fn.score}</em>
                </div>
              ))}
            </div>
            <aside className="stack-card">
              <span>類型理論序列</span>
              <h3>{result.best.code} 的功能堆疊</h3>
              <div className="stack-line">
                {profile.stack.map((fn, index) => <span key={fn}><b>{fn}</b><small>{["主導", "輔助", "第三", "弱勢"][index]}</small></span>)}
              </div>
              <p>題目排名與理論序列未必完全一致。若差距明顯，可把第二類型視為另一個假設，配合真實經歷再判斷。</p>
            </aside>
          </div>
        </section>

        <section className="result-section insight-section">
          <div className="section-heading"><div><span>03</span><h2>帶進職場的模式</h2></div></div>
          <div className="insight-grid">
            <article className="insight-card strength-card"><span className="card-index">A</span><h3>你可能帶來的優勢</h3><ul>{profile.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article className="insight-card blind-card"><span className="card-index">B</span><h3>值得留意的盲點</h3><ul>{profile.blindspots.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article className="insight-card direction-card"><span className="card-index">C</span><h3>適合發展的方向</h3><ul>{profile.directions.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        <section className="interpretation">
          <div><span>怎樣使用這份結果？</span><h2>把它當作一個可驗證的假設，<br />而不是限制你的標籤。</h2></div>
          <ol>
            <li><span>1</span><p><strong>找真實例子</strong>回想最近三次做決定或合作，看看描述是否持續出現。</p></li>
            <li><span>2</span><p><strong>詢問可信任的人</strong>請熟悉你的同事指出哪部分最像、哪部分不像。</p></li>
            <li><span>3</span><p><strong>選一項小實驗</strong>由盲點或發展方向揀一項，在未來兩星期實踐。</p></li>
          </ol>
        </section>

        <footer className="result-footer">
          <p>本工具參考 MBTI 四維及 Jungian cognitive functions 作自我探索，並非官方 MBTI® Assessment，亦非心理診斷或招聘篩選工具。</p>
          <button className="secondary-button" type="button" onClick={restart}>重新作答核心 40 題</button>
        </footer>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="主要導覽">
        <a className="brand" href="#top" aria-label="職場型格首頁"><span className="brand-mark" aria-hidden="true">職</span><span>職場型格</span></a>
        <span className="nav-note">40 題核心 · 最多 16 題追問</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> 給剛投身職場的你</p>
          <h1>了解你點樣思考，<br /><em>比一個標籤更重要。</em></h1>
          <p className="hero-intro">先透過 40 個真實職場情境探索你的工作模式；只有答案較接近時，系統才會追加針對性題目。結果包括 MBTI 傾向、認知功能及辨型清晰度。</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={startQuiz}>
              {assessmentComplete
                ? "查看上次結果"
                : coreComplete && followUpPlan === null
                  ? "完成精準辨型"
                  : activeAnsweredCount > 0
                    ? `繼續作答（${activeAnsweredCount}/${activeQuestionIds.length}）`
                    : "開始探索"} <span aria-hidden="true">→</span>
            </button>
            <span className="privacy-note">毋須登入 · 答案只留在你的裝置</span>
          </div>
          {activeAnsweredCount > 0 && !assessmentComplete && <button className="fresh-start" type="button" onClick={restart}>或重新開始</button>}
        </div>

        <aside className="preview-card" aria-label="結果預覽">
          <div className="preview-topline"><span>你的工作模式</span><span className="preview-chip">結果預覽</span></div>
          <div className="type-lockup"><span className="type-code">EN?P</span><span className="type-caption">探索你的最佳吻合模式</span></div>
          <div className="mini-bars" aria-hidden="true">
            <div><span>能量</span><i><b style={{ width: "68%" }} /></i><strong>E</strong></div>
            <div><span>資訊</span><i><b style={{ width: "82%" }} /></i><strong>N</strong></div>
            <div><span>決策</span><i><b style={{ width: "57%" }} /></i><strong>T</strong></div>
            <div><span>節奏</span><i><b style={{ width: "74%" }} /></i><strong>P</strong></div>
          </div>
          <div className="preview-tags"><span>優勢洞察</span><span>潛在盲點</span><span>發展方向</span></div>
        </aside>
      </section>

      <section className="trust-strip" aria-label="測驗特色">
        <div><span>01</span><p><strong>40 題職場核心</strong>以工作日常作判斷，不考人格術語</p></div>
        <div><span>02</span><p><strong>需要時才追問</strong>只釐清接近或互相拉扯的取向</p></div>
        <div><span>03</span><p><strong>雙層結果分析</strong>四維、認知功能與實際發展建議</p></div>
      </section>

      <section className="before-start">
        <div><p className="eyebrow">作答前請留意</p><h2>沒有「最好」的答案，<br />只有較自然的反應。</h2></div>
        <div className="before-copy">
          <p>請按你平日沒有刻意調整時的反應作答。每題可選 A、B，亦可表示傾向程度；遇到兩邊都像你，可選中間。核心部分約需 8 分鐘，若需要追問，全程約 8–12 分鐘。</p>
          <p><strong>重要說明：</strong>本工具並非官方 MBTI® Assessment，亦不屬於心理診斷或招聘評核。結果是一個自我探索的「最佳吻合假設」，不應視為固定人格標籤。</p>
          <button className="secondary-button" type="button" onClick={startQuiz}>我明白，開始作答</button>
        </div>
      </section>

      <footer className="disclaimer">職場型格 · 為自我理解而設｜MBTI® 是 The Myers-Briggs Company 的註冊商標；本工具與該機構並無關聯。</footer>
    </main>
  );
}
