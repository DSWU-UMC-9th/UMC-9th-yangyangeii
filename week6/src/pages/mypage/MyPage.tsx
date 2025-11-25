import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMeQuery, useUpdateUser } from "../../hooks/useUser";

const Page = styled.main`
  min-height: 100vh;
  background: #020617;
  color: #f9fafb;
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const Card = styled.section`
  width: 720px;
  max-width: calc(100% - 40px);
  background: #020617;
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Avatar = styled.div<{ src?: string | null }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ src }) =>
    src ? `url(${src}) center/cover no-repeat` : "#111827"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #9ca3af;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #111827;
  margin: 24px 0;
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

const SaveButton = styled.button`
  align-self: flex-start;
  margin-top: 4px;
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #ec4899;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #db2777;
  }

  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

const Helper = styled.p`
  font-size: 12px;
  color: #9ca3af;
`;

const ErrorText = styled.p`
  margin-top: 4px;
  font-size: 13px;
  color: #f97373;
`;

export default function MyPage() {
  const { data: me, isLoading, isError } = useMeQuery();
  const { mutate, isPending, isError: isUpdateError } = useUpdateUser();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (me) {
      setName(me.name ?? "");
      setBio(me.bio ?? "");
      setAvatarUrl(me.avatar ?? "");
    }
  }, [me]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: name.trim() || undefined,
      bio: bio.trim() || undefined,
      avatar: avatarUrl.trim() || undefined,
    });
  };

  if (isLoading) {
    return (
      <Page>
        <Card>불러오는 중...</Card>
      </Page>
    );
  }

  if (isError || !me) {
    return (
      <Page>
        <Card>프로필 정보를 불러오지 못했습니다.</Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <TopRow>
          <Avatar src={avatarUrl}>{!avatarUrl && ""}</Avatar>
          <UserMeta>
            <UserName>{me.name}</UserName>
            <UserEmail>{me.email}</UserEmail>
          </UserMeta>
        </TopRow>

        <Divider />

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">닉네임</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="닉네임을 입력하세요"
            />
          </Field>

          <Field>
            <Label htmlFor="bio">한 줄 소개</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Field>

          <Field>
            <Label htmlFor="avatar">이메일</Label>
            <Input
              id="avatar"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </Field>

          <SaveButton type="submit" disabled={isPending}>
            {isPending ? "저장 중..." : "프로필 저장"}
          </SaveButton>

          {isUpdateError && <ErrorText>프로필 수정에 실패했습니다.</ErrorText>}
        </Form>
      </Card>
    </Page>
  );
}
