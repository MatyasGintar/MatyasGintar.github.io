// Plynulý scroll na projekty
const btn = document.getElementById("scrollProjects");
if (btn) {
  btn.addEventListener("click", () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  });
}

// Zvýraznění aktivní sekce v navigaci
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = ["about", "projects", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${id}`);
  });
};

const io = new IntersectionObserver(
  (entries) => {
    // vyber nejviditelnější sekci
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  },
  { threshold: [0.25, 0.5, 0.75] }
);

sections.forEach(sec => io.observe(sec));

// Malý UX detail: když klikneš na link, zavolej active hned
navLinks.forEach(a => {
  a.addEventListener("click", () => {
    const id = (a.getAttribute("href") || "").replace("#", "");
    if (id) setActive(id);
  });
});