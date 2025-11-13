import { useNavigate } from "react-router-dom";
import { useLpListQuery } from "../../hooks/useLp";
import { clearTokens } from "../../hooks/useAuth";
function LpSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: "220px",
        background: "#020617",
        borderRight: "1px solid #111827",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* 로고 영역 */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#f472b6",
        }}
      >
        LP Store
      </div>

      {/* 메뉴 영역 */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontSize: "14px",
          color: "#e5e7eb",
        }}
      >
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 10px",
            borderRadius: "999px",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span>검색</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/mypage")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 10px",
            borderRadius: "999px",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <span>마이페이지</span>
        </button>
      </nav>

      {/* 하단 로그아웃 영역 */}
      <div style={{ marginTop: "auto" }}>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "999px",
            border: "none",
            background: "#111827",
            color: "#e5e7eb",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default function LpListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useLpListQuery();

  const handleCreateClick = () => {
    navigate("/lp/create");
  };

  if (isLoading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#fff",
          display: "flex",
        }}
      >
        <LpSidebar />
        <div style={{ padding: "24px", flex: 1 }}>불러오는 중...</div>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#fff",
          display: "flex",
        }}
      >
        <LpSidebar />
        <div style={{ padding: "24px", flex: 1 }}>
          목록 불러오기 오류가 발생했어요.
          <br />
          <button
            onClick={handleCreateClick}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "none",
              background: "#ec4899",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            LP 생성하기
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        display: "flex",
      }}
    >
      {/* 왼쪽 사이드바 */}
      <LpSidebar />

      {/* 오른쪽 메인 영역 */}
      <div
        style={{
          flex: 1,
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: 700 }}>LP 목록</h1>

          <button
            type="button"
            onClick={handleCreateClick}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "none",
              background: "#ec4899",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            LP 생성하기
          </button>
        </div>

        {/* LP 리스트 */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data?.map((lp) => (
            <li
              key={lp.id}
              style={{
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "1px solid #334155",
              }}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  background: "#1e293b",
                }}
              />

              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                {lp.title}
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#cbd5e1",
                  fontSize: "14px",
                }}
              >
                {lp.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
