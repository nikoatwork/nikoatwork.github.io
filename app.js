(() => {
  const tip = document.getElementById("tooltip");

  function show(e, text) {
    if (!text) return;
    const parts = text.split("\n\n");
    const title = parts.shift();
    const rest = parts.join("\n\n");
    tip.innerHTML = `<span class="tt-title">${title}</span>${rest.replace(/\n/g, "<br>")}`;
    tip.classList.add("on");
    move(e);
  }
  function hide() {
    tip.classList.remove("on");
  }
  function move(e) {
    const pad = 14;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }

  document.querySelectorAll("[data-tip]").forEach((el) => {
    el.addEventListener("mouseenter", (e) => show(e, el.dataset.tip));
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", (e) => {
      const r = el.getBoundingClientRect();
      show({ clientX: r.right, clientY: r.bottom }, el.dataset.tip);
    });
    el.addEventListener("blur", hide);
  });

  document.querySelectorAll(".mm-pin[data-scroll]").forEach((p) => {
    p.addEventListener("click", () => {
      const t = document.getElementById(p.dataset.scroll);
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const slots = document.querySelectorAll(".slot[data-key]");
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    slots.forEach((s) => {
      if (s.dataset.key === e.key) {
        s.classList.add("press");
        s.click();
        setTimeout(() => s.classList.remove("press"), 120);
      }
    });
  });

  const clock = document.getElementById("clock");
  function tick() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm} Server Time`;
  }
  tick();
  setInterval(tick, 30_000);
})();
