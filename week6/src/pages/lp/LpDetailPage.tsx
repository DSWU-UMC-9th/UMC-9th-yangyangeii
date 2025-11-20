import { useParams } from "react-router-dom";
import { useLpDetail } from "../../hooks/useLp";
import * as S from "./LpDetailPage.style";

type RouteParams = {
  lpId?: string;
};

export default function LpDetailPage() {
  const { lpId } = useParams<RouteParams>();

  if (!lpId) {
    return (
      <S.Page>
        <S.Wrapper>
          <S.StateBox>잘못된 LP 주소입니다.</S.StateBox>
        </S.Wrapper>
      </S.Page>
    );
  }

  const numericId = Number(lpId);
  const { data, isLoading, isError } = useLpDetail(numericId);

  if (isLoading) {
    return (
      <S.Page>
        <S.Wrapper>
          <S.StateBox>불러오는 중...</S.StateBox>
        </S.Wrapper>
      </S.Page>
    );
  }

  if (isError || !data) {
    return (
      <S.Page>
        <S.Wrapper>
          <S.StateBox>LP 정보를 불러오지 못했습니다.</S.StateBox>
        </S.Wrapper>
      </S.Page>
    );
  }

  // 백엔드 응답 기준: thumbnail 이 커버 이미지 역할
  const cover = data.thumbnail;

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("ko-KR")
    : "";

  // likes 는 배열이므로 길이로 카운트
  const likeCount = Array.isArray(data.likes) ? data.likes.length : 0;

  return (
    <S.Page>
      <S.Wrapper>
        <S.Card>
          {/* 상단 메타 영역 */}
          <S.HeaderRow>
            <S.AlbumMeta>
              <S.AlbumTitle>{data.title}</S.AlbumTitle>

              {/* artist 필드는 백엔드에 없으므로, 필요하면 authorId 정도만 보여주기 */}
              <S.AlbumArtist>작성자 ID · {data.authorId}</S.AlbumArtist>
            </S.AlbumMeta>

            {formattedDate && <S.DateText>{formattedDate} 업로드</S.DateText>}
          </S.HeaderRow>

          {/* 가운데 본문 + 이미지 */}
          <S.MainRow>
            <S.InfoColumn>
              <S.Description>
                {data.content ||
                  "이 LP에 대한 설명이 아직 등록되지 않았습니다."}
              </S.Description>

              {data.tags && data.tags.length > 0 && (
                <S.TagRow>
                  {data.tags.map((tag) => (
                    <S.TagChip key={tag.id}>#{tag.name}</S.TagChip>
                  ))}
                </S.TagRow>
              )}
            </S.InfoColumn>

            <S.ImageColumn>
              <S.DiscWrapper>
                {cover ? (
                  <S.DiscImage src={cover} alt={data.title} />
                ) : (
                  <S.DiscFallback>{data.title}</S.DiscFallback>
                )}
              </S.DiscWrapper>
            </S.ImageColumn>
          </S.MainRow>

          {/* 하단 액션 영역 */}
          <S.FooterRow>
            <S.ActionGroup>
              <S.LikeButton type="button">
                <span>❤</span>
                <span>좋아요</span>
              </S.LikeButton>
              <S.LikeCount>{likeCount}명 이 이 LP를 좋아합니다</S.LikeCount>
            </S.ActionGroup>

            <S.SecondaryText>
              댓글 · 공유 기능은 이후에 추가 예정
            </S.SecondaryText>
          </S.FooterRow>
        </S.Card>
      </S.Wrapper>
    </S.Page>
  );
}
