(function () {
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  const grid = document.getElementById("blogGrid");
  const listView = document.getElementById("blogList");
  const postView = document.getElementById("blogPost");
  const postTitle = document.getElementById("postTitle");
  const postDate = document.getElementById("postDate");
  const postBody = document.getElementById("postBody");

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = sorted.map(post => `
      <a class="blog-card" href="blog.html?post=${encodeURIComponent(post.slug)}">
        <div class="icon-box icon-box-coral blog-card-icon">${post.iconSvg || '<svg class="icon-svg icon-md" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'}</div>
        <p class="blog-card-date mono-tag">${formatDate(post.date)}</p>
        <h3>${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
      </a>
    `).join("");
  }

  function renderPost(slug) {
    const post = sorted.find(p => p.slug === slug);
    if (!post) {
      window.location.href = "blog.html";
      return;
    }
    postTitle.textContent = post.title;
    postDate.textContent = formatDate(post.date);
    postBody.innerHTML = post.body.map(block => {
      if (block.startsWith("## ")) {
        return `<h2>${block.slice(3)}</h2>`;
      }
      return `<p>${block}</p>`;
    }).join("");

    listView.hidden = true;
    postView.hidden = false;
    document.title = post.title + " — Hostly";
    window.scrollTo(0, 0);
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("post");

  if (slug) {
    renderPost(slug);
  } else {
    renderGrid();
  }
})();
