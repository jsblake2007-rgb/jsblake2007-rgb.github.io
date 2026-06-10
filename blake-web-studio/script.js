(() => {
  "use strict";

  /* navbar scroll state */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const setMenu = (open) => {
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* scroll reveals */
  const els = document.querySelectorAll(".reveal");
  els.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty("--rd", el.dataset.delay + "ms");
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));

  /* whatsapp share */
  const waShare = document.getElementById("waShare");
  if (waShare) {
    const isLive = location.protocol.startsWith("http");
    const msg = isLive
      ? `Check out my web design studio — I build websites for small businesses. Free mockup first: ${location.href}`
      : "Check out my web design studio — I build websites for small businesses. Free mockup first! (Ask me for the link.)";
    waShare.href = "https://wa.me/?text=" + encodeURIComponent(msg);
  }

  /* footer year */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
