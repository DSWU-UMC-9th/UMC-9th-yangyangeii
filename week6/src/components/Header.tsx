import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #111;
  color: #fff;
  border-bottom: 1px solid #222;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  a {
    color: #ccc;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  }
  a.active {
    background: #ff2aa1;
    color: #fff;
  }
`;

const Right = styled.div`
  display: flex;
  gap: 8px;
`;

export default function Header() {
  const [sp, setSp] = useSearchParams();
  const sort = (sp.get("sort") || "latest") as
    | "latest"
    | "popular"
    | "price_low"
    | "price_high";
  const setSort = (v: string) => {
    sp.set("sort", v);
    setSp(sp, { replace: true });
  };

  return (
    <Bar>
      <Link to="/" style={{ color: "#ff2aa1", fontWeight: 700 }}>
        돌려돌려LP판
      </Link>
      <Nav>
        <a
          className={sort === "latest" ? "active" : ""}
          onClick={() => setSort("latest")}
        >
          최신순
        </a>
        <a
          className={sort === "popular" ? "active" : ""}
          onClick={() => setSort("popular")}
        >
          인기순
        </a>
        <a
          className={sort === "price_low" ? "active" : ""}
          onClick={() => setSort("price_low")}
        >
          가격↓
        </a>
        <a
          className={sort === "price_high" ? "active" : ""}
          onClick={() => setSort("price_high")}
        >
          가격↑
        </a>
      </Nav>
      <Right>
        <Link to="/login">로그인</Link>
        <Link
          to="/signup"
          style={{
            color: "#111",
            background: "#ff2aa1",
            padding: "6px 10px",
            borderRadius: 6,
          }}
        >
          회원가입
        </Link>
      </Right>
    </Bar>
  );
}
