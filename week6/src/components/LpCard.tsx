import { Link } from "react-router-dom";
import styled from "styled-components";
import type { LpItem } from "../lib/api";

const Card = styled(Link)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #19191d;
  border: 1px solid #27272b;
  &:hover .ov {
    opacity: 1;
  }
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  gap: 6px;
`;

const Title = styled.strong`
  font-size: 14px;
`;
const Meta = styled.div`
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  gap: 8px;
`;

export default function LpCard({ item }: { item: LpItem }) {
  return (
    <Card to={`/lp/${item.id}`} aria-label={`${item.title} 상세로 이동`}>
      <Thumb src={item.thumbnail} alt={item.title} />
      <Overlay className="ov">
        <Title>{item.title}</Title>
        <Meta>
          {item.uploader && <span>업로더: {item.uploader}</span>}
          {typeof item.likes === "number" && <span>❤ {item.likes}</span>}
        </Meta>
      </Overlay>
    </Card>
  );
}
