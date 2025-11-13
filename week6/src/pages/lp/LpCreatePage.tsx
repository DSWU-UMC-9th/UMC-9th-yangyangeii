import type { FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCreateLp } from "../../hooks/useLp";

const Wrap = styled.div`
  max-width: 640px;
  margin: 40px auto;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  label {
    font-size: 14px;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #27272a;
  background: #020617;
  color: #e5e7eb;
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #27272a;
  background: #020617;
  color: #e5e7eb;
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px 0;
  width: 100%;
  border-radius: 8px;
  border: none;
  background: #ff2ca0;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin-top: 12px;
  color: #f97373;
`;

export default function LpCreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // 설명 -> content 필드
  const [thumbnail, setThumbnail] = useState(""); // 커버 이미지 -> thumbnail
  const [tagsText, setTagsText] = useState("");

  // hooks/useLp.ts 에서 만든 useCreateLp 훅 사용
  const { mutate, isPending, isError } = useCreateLp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    mutate(
      {
        title,
        content,
        thumbnail,
        tags,
      },
      {
        onSuccess: (createdLp) => {
          // 응답에서 id 내려온다고 가정
          navigate(`/lp/${createdLp.id}`);
        },
      }
    );
  };

  return (
    <Wrap>
      <Title>LP 생성</Title>
      <form onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="title">제목</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>

        <Field>
          <label htmlFor="content">내용</label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Field>

        <Field>
          <label htmlFor="thumbnail">썸네일 이미지 URL</label>
          <Input
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://example.com/thumbnail.png"
            required
          />
        </Field>

        <Field>
          <label htmlFor="tags">태그 (쉼표로 구분)</label>
          <Input
            id="tags"
            placeholder="밥, 국밥, 한식"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
        </Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "생성 중..." : "LP 생성"}
        </Button>

        {isError && <ErrorText>LP 생성에 실패했습니다.</ErrorText>}
      </form>
    </Wrap>
  );
}
