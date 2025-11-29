import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background-color: #050509;
  color: #ffffff;
  display: flex;
  justify-content: center;
  padding: 80px 24px;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
`;

export const Card = styled.div`
  background: #111118;
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AlbumMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AlbumTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const AlbumArtist = styled.p`
  font-size: 14px;
  color: #c7c7d6;
`;

export const Uploader = styled.p`
  font-size: 12px;
  color: #8f8fa2;
`;

export const DateText = styled.p`
  font-size: 12px;
  color: #8f8fa2;
`;

export const MainRow = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #e3e3ee;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagChip = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background-color: #1f1f2a;
  color: #f5f5ff;
`;

export const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DiscWrapper = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 24px;
  background: #15151f;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8);
`;

export const DiscImage = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 12px #050509;
`;

export const DiscFallback = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 20%, #ff73b3, #7a3cff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.06em;
`;

export const FooterRow = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LikeButton = styled.button`
  border: none;
  outline: none;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  background: #ff3d88;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: #ff5c9a;
  }
`;

export const LikeCount = styled.span`
  font-size: 13px;
  color: #f5f5ff;
`;

export const SecondaryText = styled.span`
  font-size: 12px;
  color: #8f8fa2;
`;

export const StateBox = styled.div`
  padding: 24px;
  text-align: center;
  color: #c7c7d6;
`;
