import css from "./App.module.css";
import CafeInfo from "./CafeInfo";
import { useState } from "react";
import type { Votes, VoteType } from "../types/votes";
import VoteOptions from "./VoteOptions";
import VoteStats from "./VoteStats";
import Notification from "./Notification";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    const updatedVotes = { ...votes };
    updatedVotes[type] += 1;
    setVotes(updatedVotes);
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.bad + votes.good + votes.neutral;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />

      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
