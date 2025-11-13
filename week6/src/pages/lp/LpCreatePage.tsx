import type { FormEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCreateLp } from "../../hooks/useLp";

const OVERLAY_BG = "rgba(0,0,0,0.65)";
const DEFAULT_THUMBNAIL =
  "https://images.pexels.com/photos/164716/pexels-photo-164716.jpeg?auto=compress&cs=tinysrgb&w=600";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${OVERLAY_BG};
  z-index: 50;
`;

const Modal = styled.div`
  width: 480px;
  max-width: calc(100% - 40px);
  border-radius: 24px;
  background: #111827;
  color: #e5e7eb;
  padding: 32px 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #e5e7eb;
  }
`;

const DiscWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Disc = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #111 0, #020617 45%, #000 60%);
  border: 8px solid #020617;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 50%;
    width: 56px;
    height: 56px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #f9fafb;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 50%;
    width: 16px;
    height: 16px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #111827;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #9ca3af;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #f472b6;
    box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.4);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #f472b6;
    box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.4);
  }
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TagInput = styled(Input)`
  flex: 1;
`;

const TagAddButton = styled.button`
  padding: 0 16px;
  border-radius: 10px;
  border: none;
  background: #4b5563;
  color: #f9fafb;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #6b7280;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagChip = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: #1f2937;
  color: #f9fafb;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 11px 0;
  border-radius: 10px;
  border: none;
  background: #ec4899;
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #db2777;
  }

  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin-top: 6px;
  font-size: 13px;
  color: #f97373;
  text-align: center;
`;

type LpCreatePageProps = {
  onClose?: () => void;
};

export default function LpCreatePage({ onClose }: LpCreatePageProps) {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useCreateLp();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) return;

    mutate(
      {
        title: name.trim(),
        content: content.trim(),
        thumbnail: DEFAULT_THUMBNAIL,
        tags,
      },
      {
        onSuccess: (createdLp) => {
          if (onClose) {
            onClose();
          } else {
            navigate(`/v1/lps/${createdLp.id}`);
          }
        },
      }
    );
  };

  return (
    <Overlay>
      <Modal>
        <TopRow>
          <CloseButton
            type="button"
            aria-label="닫기"
            onClick={onClose ?? (() => navigate(-1))}
          >
            ×
          </CloseButton>
        </TopRow>

        <DiscWrapper>
          <Disc />
        </DiscWrapper>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="lp-name">LP Name</Label>
            <Input
              id="lp-name"
              placeholder="LP 제목을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="lp-content">LP Content</Label>
            <TextArea
              id="lp-content"
              placeholder="LP에 대한 설명을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="lp-tag">LP Tag</Label>
            <TagRow>
              <TagInput
                id="lp-tag"
                placeholder="태그를 입력하고 Add 버튼을 누르세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <TagAddButton type="button" onClick={handleAddTag}>
                Add
              </TagAddButton>
            </TagRow>
            {tags.length > 0 && (
              <TagList>
                {tags.map((tag) => (
                  <TagChip key={tag}>#{tag}</TagChip>
                ))}
              </TagList>
            )}
          </Field>

          <SubmitButton type="submit" disabled={isPending}>
            {isPending ? "등록 중..." : "Add LP"}
          </SubmitButton>

          {isError && <ErrorText>LP 생성에 실패했습니다.</ErrorText>}
        </Form>
      </Modal>
    </Overlay>
  );
}
