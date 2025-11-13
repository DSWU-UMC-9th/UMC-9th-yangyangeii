import React from "react";
import type { LpItem } from "../lib/api";

type LpCardProps = {
  lp: LpItem;
};

export default function LpCard({ lp }: LpCardProps) {
  return (
    <article>
      <img src={lp.thumbnail} alt={lp.title} />

      <h3>{lp.title}</h3>
      <p>{lp.uploader}</p>

      <p>❤️ {lp.likes ?? 0}</p>
    </article>
  );
}
