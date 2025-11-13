import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../constants";
import { useAuthContext } from "../context/AuthContext";

type MainLayoutProps = {
  children: ReactNode;
};

const Wrap = styled.div`
  min-height: 100vh;
  background: #000; /* 전체 배경 검정 */
  color: #fff;
`;

const Header = styled.header`
  height: 56px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #222;
  background: #000;
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  text-decoration: none;

  span {
    color: #ff2ca0;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: #e5e7eb;
  text-decoration: none;

  &:hover {
    color: #ff2ca0;
  }
`;

const Main = styled.main`
  min-height: calc(100vh - 56px);
  padding: 40px 48px 48px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function MainLayout({ children }: MainLayoutProps) {
  const { isLoggedIn } = useAuthContext();

  return (
    <Wrap>
      <Header>
        <Logo to={ROUTES.lpList}>
          LP <span>Store</span>
        </Logo>
        <Nav>
          <NavLink to={ROUTES.lpList}>LP 목록</NavLink>
          {isLoggedIn ? (
            <>
              <span>반갑습니다!</span>
              {/* 필요하면 로그아웃 버튼도 추가 가능 */}
            </>
          ) : (
            <>
              <NavLink to={ROUTES.login}>로그인</NavLink>
              <NavLink to={ROUTES.signup}>회원가입</NavLink>
            </>
          )}
        </Nav>
      </Header>

      <Main>{children}</Main>
    </Wrap>
  );
}
