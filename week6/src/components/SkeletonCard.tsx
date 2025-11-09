import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { opacity: .6 }
  50% { opacity: .9 }
  100% { opacity: .6 }
`;

const Box = styled.div`
  height: 100%;
  border-radius: 12px;
  border: 1px solid #27272b;
  background: #19191d;
  animation: ${pulse} 1.2s infinite;
`;
const Ph = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background: #222;
`;

export default function SkeletonCard() {
  return (
    <Box>
      <Ph />
    </Box>
  );
}
