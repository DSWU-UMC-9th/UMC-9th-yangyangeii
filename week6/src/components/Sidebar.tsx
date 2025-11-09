import styled from "styled-components";

const Aside = styled.aside`
  width: 260px;
  background: #0d0d0f;
  border-right: 1px solid #1f1f23;
  color: #bbb;
  position: sticky;
  top: 52px;
  height: calc(100dvh - 52px);
  padding: 16px;
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
`;

export default function Sidebar() {
  return (
    <Aside>
      <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12 }}>
        메뉴
      </div>
      <ul style={{ display: "grid", gap: 8 }}>
        <li>찾기</li>
        <li>마이페이지</li>
        <li>설정</li>
      </ul>
    </Aside>
  );
}
