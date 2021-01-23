import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../store/state";

export const SharesSum: React.FC = () => {
  const shares = useSelector((state: State) => state.donation.shares);
  const sum = shares.reduce((acc, curr) => acc + curr.share, 0);

  if (sum === 100) return null;

  return <p>{`Du har fordelt ${sum} / 100%`}</p>;
};
