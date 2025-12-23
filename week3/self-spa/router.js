const routes = {
  "/": () => `
    <section class="card">
      <h1>홈</h1>
      <p>History API만으로 만든 SPA</p>
      <p><a href="/posts/00" data-link>게시글 목록 보기</a></p>
    </section>
  `,
  "/about": () => `
    <section class="card">
      <h1>소개</h1>
      <p>라이브러리 없이 pushState/popstate로 라우팅함.</p>
    </section>
  `,
  "/posts": () => `
    <section class="card">
      <h1>게시글 목록</h1>
      <ul>
        <li><a href="/posts/1" data-link>게시글 1</a></li>
        <li><a href="/posts/2" data-link>게시글 2</a></li>
      </ul>
    </section>
  `,
};

function matchDynamic(path) {
  const postDetail = path.match(/^\/posts\/(\d+)$/);
  if (postDetail) {
    const id = postDetail[1];
    return () => `
      <section class="card">
        <h1>게시글 #${id}</h1>
        <p>이 페이지는 동적 경로를 정규식으로 매칭하여 렌더링함.</p>
        <p><a href="/posts" data-link>목록으로</a></p>
      </section>
    `;
  }
  return null;
}

function resolveComponent(path) {
  if (routes[path]) return routes[path];
  const dyn = matchDynamic(path);
  if (dyn) return dyn;
  return () => `
    <section class="card">
      <h1>404</h1>
      <p>${path} 경로를 찾을 수 없음.</p>
      <p><a href="/" data-link>홈으로</a></p>
    </section>
  `;
}

const app = document.getElementById("app");

function render() {
  const path = location.pathname || "/";
  const Component = resolveComponent(path);
  app.innerHTML = Component();

  document.title =
    {
      "/": "홈 - Handmade SPA",
      "/about": "소개 - Handmade SPA",
      "/posts": "게시글 - Handmade SPA",
    }[path] || `페이지 - Handmade SPA`;

  Array.from(document.querySelectorAll("a[data-link]")).forEach((a) => {
    a.removeAttribute("aria-current");
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });

  window.scrollTo({ top: 0 });
  app.setAttribute("tabindex", "-1");
  app.focus();
}

export function navigate(path) {
  if (path === location.pathname) return;
  history.pushState({}, "", path);
  render();
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  const url = new URL(a.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  navigate(url.pathname);
});

window.addEventListener("popstate", render);

render();
