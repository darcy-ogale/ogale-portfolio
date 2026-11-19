import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import linkaImg from "./assets/linka.webp";
import scholarImg from "./assets/scholar-vault.webp";
import gclassImg from "./assets/gclasscheck.webp";
import "./styles.css";

const personalEmail = "darz9547@gmail.com";
const schoolEmail = "202410352@gordoncollege.edu.ph";
const FRAME_COUNT = 238;

const projects = [
  { title: "Linka", type: "Personal project", description: "A social media concept for sharing posts, messaging friends, and managing a profile.", image: linkaImg, alt: "Linka login screen with the headline Stay Close. Stay Connected." },
  { title: "Scholar Vault", type: "Academic project", description: "A research management portal for manuscript submission, review, revision, and approval tracking.", image: scholarImg, alt: "Scholar Vault login screen over an aerial view of the Gordon College campus" },
  { title: "GClassCheck", type: "Academic project", description: "A web-based system that helps manage and monitor student class attendance.", image: gclassImg, alt: "GClass Check login screen with the Gordon College seal on a green background" }
];

const skillGroups = [
  { name: "Build", items: ["HTML & CSS", "JavaScript", "React", "Node.js", "Python"] },
  { name: "Design", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"] }
];

const roles = ["web developer", "UI/UX learner", "problem solver", "lifelong student"];
const marqueeItems = ["HTML & CSS", "JavaScript", "React", "Node.js", "Python", "Figma", "Adobe Photoshop", "Adobe Illustrator"];

function SequenceBackground() {
  const canvas = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current, cv = canvas.current, ctx = cv.getContext("2d");
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = window.innerWidth < 700 ? 2 : 1;
    const ids = [];
    for (let i = 1; i <= FRAME_COUNT; i += step) ids.push(i);
    if (ids[ids.length - 1] !== FRAME_COUNT) ids.push(FRAME_COUNT);
    const n = ids.length;
    const imgs = new Array(n).fill(null);
    const base = import.meta.env.BASE_URL;
    let cur = 0, target = 0, drawn = -1, raf = 0, last = 0, alive = true, w = 0, h = 0, lastW = 0, lastH = 0;

    const draw = i => {
      let k = i;
      while (k >= 0 && !imgs[k]) k--;
      if (k < 0) { k = i; while (k < n && !imgs[k]) k++; }
      const img = imgs[k];
      if (!img) return;
      drawn = i;
      const wide = w / h > 1.15;
      const sc = Math.max(w / img.naturalWidth, h / img.naturalHeight) * (wide ? 1.18 : 1);
      const dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
      const dx = wide ? Math.min(0, Math.max(w - dw, w * 0.62 - dw / 2)) : (w - dw) / 2;
      ctx.drawImage(img, dx, (h - dh) / 2, dw, dh);
    };
    const resize = () => {
      if (cv.clientWidth === lastW && Math.abs(cv.clientHeight - lastH) < 120) return;
      lastW = cv.clientWidth; lastH = cv.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = lastW * dpr; h = lastH * dpr;
      cv.width = w; cv.height = h;
      drawn = -1; draw(Math.round(cur));
    };
    const load = idx => new Promise(res => {
      const im = new Image();
      im.onload = () => { imgs[idx] = im; res(); };
      im.onerror = res;
      im.src = `${base}frames/${String(ids[idx]).padStart(3, "0")}.webp`;
    });
    const tick = t => {
      const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
      last = t;
      cur += (target - cur) * (1 - Math.exp(-dt * 7));
      if (Math.abs(target - cur) < 0.02) cur = target;
      const idx = Math.round(cur);
      if (idx !== drawn) draw(idx);
      raf = cur !== target ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--prog", p);
      root.classList.toggle("scrolled", window.scrollY > 8);
      target = p * (n - 1);
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      load(n - 1).then(() => { cur = target = n - 1; drawn = -1; draw(n - 1); });
      return () => window.removeEventListener("resize", resize);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(root);
    (async () => {
      await load(0); draw(0);
      let done = 1, next = 1;
      const worker = async () => {
        while (alive && next < n) {
          const k = next++;
          await load(k);
          done++;
          el.style.setProperty("--load", done / n);
        }
      };
      await Promise.all([worker(), worker(), worker(), worker(), worker()]);
      if (alive) { el.classList.add("ready"); draw(Math.round(cur)); }
    })();
    onScroll();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div className="bg" ref={wrap} aria-hidden="true">
    <canvas ref={canvas} className="bg-canvas"></canvas>
    <div className="bg-scrim"></div>
    <div className="bg-load"></div>
  </div>;
}

function ScrollMeter() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round(Math.min(1, Math.max(0, window.scrollY / max)) * 100) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const show = pct > 3;
  return <button className={`meter ${show ? "show" : ""}`} tabIndex={show ? 0 : -1} aria-label={`Scrolled ${pct} percent. Back to top`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <defs><linearGradient id="meterGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff3d9a" /><stop offset="0.5" stopColor="#8a5cff" /><stop offset="1" stopColor="#3bb7ff" /></linearGradient></defs>
      <circle className="meter-track" cx="28" cy="28" r="25" />
      <circle className="meter-ring" cx="28" cy="28" r="25" style={{ strokeDashoffset: 157.08 * (1 - pct / 100) }} />
    </svg>
    <span className="meter-num" aria-hidden="true">{pct}</span>
    <span className="meter-arrow" aria-hidden="true">↑</span>
  </button>;
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` }}>{children}</Tag>;
}

function SplitWords({ text, start = 0 }) {
  return <>{text.split(" ").map((w, i) =>
    <span className="word" key={i}><span style={{ "--i": i + start }}>{w}</span>{" "}</span>
  )}</>;
}

function RoleRoller() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);
  return <p className="roller hero-in" style={{ "--i": 6 }} aria-label={`I'm a ${roles[i]}`}>
    <span>I'm a</span>
    <span className="roller-window" aria-hidden="true">
      <span className="roller-track" style={{ transform: `translateY(-${i * 100}%)` }}>
        {roles.map(r => <span key={r}>{r}</span>)}
      </span>
    </span>
  </p>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Marquee() {
  const row = marqueeItems.map(item => <span key={item}>{item}<i></i></span>);
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{row}{row}</div></div>;
}

function Header() {
  return <header className="header">
    <Link to="/" className="wordmark">Darcy Ogale</Link>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
    <Link className="btn btn-small" to="/contact">Email me</Link>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <span>© 2026 Darcy Ogale</span>
    <a href={`mailto:${personalEmail}`}>{personalEmail}</a>
  </footer>;
}

function Home() {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <>
    <section className="hero" ref={heroRef}>
      <div className="hero-copy">
        <p className="kicker hero-in" style={{ "--i": 0 }}>BSIT student and aspiring web developer</p>
        <h1><SplitWords text="Building digital ideas into reality." start={1} /></h1>
        <RoleRoller />
        <p className="lead hero-in" style={{ "--i": 7 }}>I'm Darcy Ogale. I enjoy making clean, useful, and user-friendly websites and systems, from the first wireframe to the working page.</p>
        <div className="actions hero-in" style={{ "--i": 8 }}>
          <Link className="btn" to="/projects">View my projects</Link>
          <Link className="btn btn-ghost" to="/contact">Get in touch</Link>
        </div>
      </div>
    </section>

    <Marquee />

    <section className="facts" aria-label="At a glance">
      <Reveal delay={0}><strong>3rd year</strong><span>BS Information Technology</span></Reveal>
      <Reveal delay={120}><strong>Gordon College</strong><span>Olongapo City, Philippines</span></Reveal>
      <Reveal delay={240}><strong>3 projects</strong><span>Web apps built for school and practice</span></Reveal>
    </section>

    <section className="block">
      <Reveal className="block-head">
        <h2>Selected projects</h2>
        <Link className="text-link" to="/projects">See all projects</Link>
      </Reveal>
      <ProjectGrid limit={2} />
    </section>

    <Reveal className="cta">
      <h2>Have a project or idea? Let's talk about it.</h2>
      <Link className="btn" to="/contact">Get in touch</Link>
    </Reveal>
  </>;
}

function About() {
  return <main className="page">
    <Reveal className="about-content">
      <p className="kicker">About me</p>
      <h1 className="page-title">Hi, I'm Darcy Ogale.</h1>
      <p className="large-copy">I'm a third-year Bachelor of Science in Information Technology student at Gordon College with an interest in web development and UI/UX design.</p>
      <p>I enjoy creating websites and systems that solve problems, exploring new technologies, and improving my skills through academic and personal projects.</p>
      <div className="skills">
        <h2>My skills</h2>
        {skillGroups.map(group => <div className="skill-row" key={group.name}>
          <h3>{group.name}</h3>
          <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>)}
      </div>
    </Reveal>
  </main>;
}

function ProjectGrid({ limit }) {
  return <div className="project-grid">{projects.slice(0, limit || projects.length).map((project, i) =>
    <Reveal as="article" className="project-card" key={project.title} delay={i * 140}>
      <div className="project-art">
        <div className="window" aria-hidden="true"><i></i><i></i><i></i></div>
        <img src={project.image} alt={project.alt} loading="lazy" width="1400" height="788" />
      </div>
      <p className="project-type">{project.type}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </Reveal>
  )}</div>;
}

function Projects() {
  return <main className="page">
    <p className="kicker">Projects</p>
    <h1 className="page-title">Things I've built.</h1>
    <p className="lead">Academic projects and digital ideas focused on building useful web applications.</p>
    <ProjectGrid />
  </main>;
}

function Contact() {
  return <main className="page">
    <p className="kicker">Contact</p>
    <h1 className="page-title">Let's talk about it.</h1>
    <p className="lead">I'm open to new ideas, collaborations, and opportunities to learn. Feel free to reach out.</p>
    <a className="contact-email" href={`mailto:${personalEmail}`}>{personalEmail}</a>
    <Reveal as="dl" className="contact-details" delay={100}>
      <div><dt>Personal email</dt><dd><a href={`mailto:${personalEmail}`}>{personalEmail}</a></dd></div>
      <div><dt>School email</dt><dd><a href={`mailto:${schoolEmail}`}>{schoolEmail}</a></dd></div>
      <div><dt>Location</dt><dd>Olongapo City, Philippines</dd></div>
      <div><dt>Socials</dt><dd>Facebook, Instagram</dd></div>
    </Reveal>
  </main>;
}

function Pages() {
  const { pathname } = useLocation();
  return <div className="route" key={pathname}><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Home />} />
  </Routes></div>;
}

function App() {
  return <HashRouter><ScrollToTop /><SequenceBackground /><ScrollMeter /><div className="app-shell"><Header /><Pages /><Footer /></div></HashRouter>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
