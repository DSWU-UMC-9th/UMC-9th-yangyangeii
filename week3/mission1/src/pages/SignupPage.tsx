import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 간단 유효성 검사기
const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
const MIN_PW = 6;

export default function SignupPage() {
  const nav = useNavigate();

  // 다단계 상태
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // step1: 이메일
  const [email, setEmail] = useState("");
  const emailValid = isEmail(email);
  const emailError =
    email.length > 0 && !emailValid
      ? "올바른 이메일 형식을 입력해 주세요."
      : "";

  // step2: 비밀번호
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const pwLenOk = pw.length >= MIN_PW;
  const pwLenError =
    pw.length > 0 && !pwLenOk
      ? `비밀번호는 ${MIN_PW}자 이상이어야 합니다.`
      : "";
  const pwMatchOk = pw2.length > 0 && pw === pw2;
  const pwMatchError =
    pw2.length > 0 && pw !== pw2 ? "비밀번호가 일치하지 않습니다." : "";

  // step3: 프로필
  const [nickname, setNickname] = useState("");
  const nicknameOk = nickname.trim().length >= 2;

  // 다음/완료 핸들러
  const goNextFromEmail = () => {
    if (emailValid) setStep(2);
  };
  const goNextFromPw = () => {
    if (pwLenOk && pwMatchOk) setStep(3);
  };
  const finish = () => {
    if (!nicknameOk) return;
    // 실제 회원가입 API는 아직 미션 범위 외 — 성공 UX만 구현
    alert("회원가입이 완료되었습니다! 🙌");
    nav("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-pink-400">
            돌려돌려LP판
          </Link>
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-3 py-1 rounded-md border border-white/20 text-sm"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-neutral-800/60 ring-1 ring-white/10 p-6">
          {/* 상단 뒤로 */}
          <button
            onClick={() =>
              step === 1 ? history.back() : setStep((s) => (s === 2 ? 1 : 2))
            }
            className="text-white/80 text-sm mb-4"
          >
            ← 뒤로
          </button>

          <h1 className="text-center text-xl font-bold mb-6">회원가입</h1>

          {/* STEP PROGRESS */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={[
                  "h-2 w-2 rounded-full",
                  step >= (s as 1 | 2 | 3) ? "bg-pink-400" : "bg-white/20",
                ].join(" ")}
              />
            ))}
          </div>

          {/* STEP 1 — 이메일 */}
          {step === 1 && (
            <div className="space-y-4">
              <button
                type="button"
                className="w-full h-10 rounded-md border border-white/20"
              >
                구글 로그인
              </button>

              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해 주세요"
                  className={[
                    "w-full h-10 rounded-md bg-transparent px-3 ring-1 outline-none",
                    emailError ? "ring-red-500/60" : "ring-white/20",
                  ].join(" ")}
                />
                {emailError && (
                  <p className="mt-2 text-xs text-red-400">{emailError}</p>
                )}
              </div>

              <button
                disabled={!emailValid}
                onClick={goNextFromEmail}
                className={[
                  "w-full h-10 rounded-md",
                  emailValid
                    ? "bg-pink-500 hover:brightness-110"
                    : "bg-pink-500/40 cursor-not-allowed",
                ].join(" ")}
              >
                다음
              </button>
            </div>
          )}

          {/* STEP 2 — 비밀번호/확인 + 가시성 토글 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-sm text-white/70 bg-white/5 rounded px-3 py-2">
                {email}
              </div>

              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="비밀번호를 입력해 주세요"
                  className={[
                    "w-full h-10 rounded-md bg-transparent px-3 ring-1 outline-none",
                    pwLenError ? "ring-red-500/60" : "ring-white/20",
                  ].join(" ")}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/70"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? "숨기기" : "보기"}
                </button>
                {pwLenError && (
                  <p className="mt-2 text-xs text-red-400">{pwLenError}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPw2 ? "text" : "password"}
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  placeholder="비밀번호를 다시 한 번 입력해 주세요"
                  className={[
                    "w-full h-10 rounded-md bg-transparent px-3 ring-1 outline-none",
                    pwMatchError ? "ring-red-500/60" : "ring-white/20",
                  ].join(" ")}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/70"
                  onClick={() => setShowPw2((v) => !v)}
                >
                  {showPw2 ? "숨기기" : "보기"}
                </button>
                {pwMatchError && (
                  <p className="mt-2 text-xs text-red-400">{pwMatchError}</p>
                )}
              </div>

              <button
                disabled={!(pwLenOk && pwMatchOk)}
                onClick={goNextFromPw}
                className={[
                  "w-full h-10 rounded-md",
                  pwLenOk && pwMatchOk
                    ? "bg-pink-500 hover:brightness-110"
                    : "bg-pink-500/40 cursor-not-allowed",
                ].join(" ")}
              >
                다음
              </button>
            </div>
          )}

          {/* STEP 3 — 닉네임 + 프로필 UI */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex flex-col items-center gap-3">
                <div className="h-20 w-20 rounded-full bg-white/10 ring-1 ring-white/20 grid place-items-center">
                  <span className="text-white/60 text-3xl">👤</span>
                </div>
                <p className="text-xs text-white/60">
                  (프로필 이미지는 UI만 구현)
                </p>
              </div>

              <div className="relative">
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임 입력"
                  className={[
                    "w-full h-10 rounded-md bg-transparent px-3 ring-1 outline-none",
                    nickname.length > 0 && !nicknameOk
                      ? "ring-red-500/60"
                      : "ring-white/20",
                  ].join(" ")}
                />
                {nickname.length > 0 && !nicknameOk && (
                  <p className="mt-2 text-xs text-red-400">
                    닉네임은 2자 이상 입력해 주세요.
                  </p>
                )}
              </div>

              <button
                disabled={!nicknameOk}
                onClick={finish}
                className={[
                  "w-full h-10 rounded-md",
                  nicknameOk
                    ? "bg-pink-500 hover:brightness-110"
                    : "bg-pink-500/40 cursor-not-allowed",
                ].join(" ")}
              >
                회원가입 완료
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
