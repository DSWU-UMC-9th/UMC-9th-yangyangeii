import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLoginMutation } from "../../hooks/useAuth";

const Wrap = styled.div`
  max-width: 420px;
  margin: 80px auto;
  padding: 32px;
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 0 20px rgba(255, 20, 147, 0.15);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 32px;
  font-weight: 600;
  text-align: center;
  color: #ff2ca0;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    font-size: 14px;
    color: #ccc;
  }

  input {
    padding: 12px;
    border: 1px solid #333;
    border-radius: 8px;
    background: #000;
    color: #fff;
    font-size: 15px;

    &:focus {
      border-color: #ff2ca0;
      outline: none;
      box-shadow: 0 0 6px rgba(255, 44, 160, 0.4);
    }
  }
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  background: #ff2ca0;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover:not(:disabled) {
    background: #ff50b2;
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin-top: 12px;
  color: #ff4e78;
  text-align: center;
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: loginMutate,
    isPending,
    error,
  } = useLoginMutation(() => {
    navigate("/lp");
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutate({ email, password });
  };

  return (
    <Wrap>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인"}
        </Button>

        {Boolean(error) && <ErrorText>로그인에 실패했습니다.</ErrorText>}
      </form>
    </Wrap>
  );
}
