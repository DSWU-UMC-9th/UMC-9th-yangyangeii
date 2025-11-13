// // src/components/common/LpCard.tsx
// import type { MouseEvent } from "react";
// import styled from "styled-components";
// import type { LpItem } from "../../types/lp";

// export type LpCardProps = {
//   lp: LpItem;
//   onClick?: (e: MouseEvent<HTMLLIElement>) => void;
// };

// const Card = styled.li`
//   display: flex;
//   gap: 16px;
//   padding: 16px 20px;
//   border-radius: 12px;
//   border: 1px solid #27272a;
//   background: #111827;
//   cursor: pointer;

//   & + & {
//     margin-top: 12px;
//   }

//   &:hover {
//     border-color: #f472b6;
//     box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.4);
//   }
// `;

// const Thumbnail = styled.div`
//   flex: 0 0 96px;
//   height: 96px;
//   border-radius: 10px;
//   overflow: hidden;
//   background: #020617;
//   border: 1px solid #27272a;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 11px;
//   color: #6b7280;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const ContentWrap = styled.div`
//   flex: 1;
//   min-width: 0;
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.p`
//   font-size: 16px;
//   font-weight: 600;
//   color: #f9fafb;
// `;

// const Excerpt = styled.p`
//   margin-top: 6px;
//   font-size: 13px;
//   color: #9ca3af;
//   line-height: 1.4;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
// `;

// const MetaRow = styled.div`
//   margin-top: 10px;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
//   font-size: 12px;
//   color: #9ca3af;
// `;

// const Dot = styled.span`
//   margin: 0 4px;
//   &::before {
//     content: "·";
//   }
// `;

// const TagList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 4px;
// `;

// const Tag = styled.span`
//   padding: 2px 6px;
//   border-radius: 999px;
//   border: 1px solid #f472b6;
//   font-size: 11px;
//   color: #f9a8d4;
// `;

// export default function LpCard({ lp, onClick }: LpCardProps) {
//   const likeCount = Array.isArray(lp.likes) ? lp.likes.length : 0;
//   const createdDate = lp.createdAt?.slice(0, 10) ?? "";
//   const tags = lp.tags ?? [];
//   const [first, ...rest] = tags;

//   return (
//     <Card onClick={onClick}>
//       <Thumbnail>
//         {lp.thumbnail ? (
//           <img src={lp.thumbnail} alt={lp.title} />
//         ) : (
//           <>No Image</>
//         )}
//       </Thumbnail>

//       <ContentWrap>
//         <Title>{lp.title}</Title>
//         <Excerpt>{lp.content}</Excerpt>

//         <MetaRow>
//           {createdDate && <span>{createdDate}</span>}
//           <Dot />
//           <span>좋아요 {likeCount}개</span>

//           {first && (
//             <>
//               <Dot />
//               <TagList>
//                 <Tag>#{first.name}</Tag>
//                 {rest.map((tag) => (
//                   <Tag key={tag.id}>#{tag.name}</Tag>
//                 ))}
//               </TagList>
//             </>
//           )}
//         </MetaRow>
//       </ContentWrap>
//     </Card>
//   );
// }
