import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "./styles.css";

const personalEmail = "darz9547@gmail.com";
const schoolEmail = "202410352@gordoncollege.edu.ph";

const projects = [
  {
    number: "01",
    title: "Linka",
    type: "SOCIAL / FRONTEND",
    description: "A social media application concept for sharing posts, connecting with friends, and interacting online.",
    label: "LINKA"
  },
  {
    number: "02",
    title: "Scholar Vault",
    type: "WEB APPLICATION",
    description: "A research management portal for manuscript submission, review, revision, and approval tracking.",
    label: "SCHOLAR\nVAULT"
  },
  {
    number: "03",
    title: "GClassCheck",
    type: "STUDENT MANAGEMENT",
    description: "A web-based system designed to help manage and monitor student class attendance.",
    label: "GCLASSCHECK"
  }
];

function Header() {
  return <header className="header">
    <Link to="/" className="wordmark">DARCY OG<span>®</span></Link>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
    <a className="header-note" href={`mailto:${personalEmail}`}>LET'S TALK ↗</a>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <span>© 2026 — DARCY OGALE</span>
    <a href={`mailto:${personalEmail}`}>EMAIL ↗</a>
  </footer>;
}

function SectionLabel({ children }) {
  return <div className="section-label"><span className="label-dot"></span>{children}</div>;
}

function Home() {
  return <>
    <section className="hero section-wrap">
      <SectionLabel>BSIT STUDENT / ASPIRING WEB DEVELOPER</SectionLabel>
      <h1>Building digital<br /><span>ideas into reality.</span></h1>
      <div className="hero-bottom">
        <p>I'm Darcy Ogale, an aspiring web developer who enjoys building useful, clean, and user-friendly digital experiences.</p>
        <Link className="round-link" to="/projects" aria-label="Explore projects">↓</Link>
      </div>
      <div className="hero-index"><span>SCROLL TO EXPLORE</span><span>01 / 04</span></div>
    </section>
    <section className="intro-section section-wrap">
      <SectionLabel>GET TO KNOW ME</SectionLabel>
      <div className="split-heading">
        <h2>A bit about<br /><span>myself.</span></h2>
        <div className="intro-copy">
          <p>I'm a third-year Bachelor of Science in Information Technology student at Gordon College with an interest in web development and UI/UX design.</p>
          <Link className="text-link" to="/about">MORE ABOUT ME <span>↗</span></Link>
        </div>
      </div>
    </section>
    <section className="featured section-wrap">
      <div className="section-heading">
        <div><SectionLabel>A FEW THINGS I'VE WORKED ON</SectionLabel><h2>Selected projects<span>.</span></h2></div>
        <Link className="text-link" to="/projects">ALL PROJECTS ↗</Link>
      </div>
      <ProjectGrid limit={2} />
    </section>
    <section className="cta-section section-wrap">
      <SectionLabel>HAVE A PROJECT OR IDEA?</SectionLabel>
      <h2>Let's talk<br /><span>about it.</span></h2>
      <Link className="pill-button" to="/contact">GET IN TOUCH <span>↗</span></Link>
    </section>
  </>;
}

function About() {
  return <main className="page section-wrap">
    <SectionLabel>GET TO KNOW ME</SectionLabel>
    <h1 className="page-title">A bit about<br /><span>myself.</span></h1>
    <div className="about-grid">
      <div className="about-stamp">DARCY<br />OGALE<br /><span>✳</span></div>
      <div className="about-content">
        <h2>Hi, I'm Darcy Ogale.</h2>
        <p className="large-copy">I'm a third-year Bachelor of Science in Information Technology student at Gordon College with an interest in web development and UI/UX design.</p>
        <p>I enjoy creating websites and systems that solve problems, exploring new technologies, and improving my skills through academic and personal projects.</p>
        <div className="skills-block">
          <h3>SKILLS I'M BUILDING</h3>
          <div className="skills-list">
            <span>HTML &amp; CSS</span><span>JavaScript</span><span>React</span><span>Node.js</span><span>Python</span><span>Figma</span><span>Adobe Photoshop</span><span>Adobe Illustrator</span>
          </div>
        </div>
      </div>
    </div>
  </main>;
}

function ProjectGrid({ limit }) {
  return <div className="project-grid">{projects.slice(0, limit || projects.length).map(project =>
    <article className="project-card" key={project.number}>
      <div className="project-art"><span className="art-number">{project.number} / 03</span><span className="art-word">{project.label.split("\\n").map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</span><span className="art-mark">↗</span></div>
      <div className="project-meta"><span>{project.type}</span><span>{project.number}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </article>
  )}</div>;
}

function Projects() {
  return <main className="page section-wrap">
    <SectionLabel>A FEW THINGS I'VE WORKED ON</SectionLabel>
    <h1 className="page-title">Selected<br /><span>projects.</span></h1>
    <p className="page-lead">A collection of academic projects and digital ideas focused on building useful web applications.</p>
    <ProjectGrid />
  </main>;
}

function Contact() {
  return <main className="page contact-page section-wrap">
    <SectionLabel>HAVE A PROJECT OR IDEA?</SectionLabel>
    <h1 className="page-title">Let's talk<br /><span>about it.</span></h1>
    <p className="page-lead">I'm open to new ideas, collaborations, and opportunities to learn. Feel free to reach out.</p>
    <a className="contact-email" href={`mailto:${personalEmail}`}>{personalEmail} <span>↗</span></a>
    <div className="contact-details">
      <div><span className="detail-label">PERSONAL EMAIL</span><a href={`mailto:${personalEmail}`}>{personalEmail}</a></div>
      <div><span className="detail-label">SCHOOL EMAIL</span><a href={`mailto:${schoolEmail}`}>{schoolEmail}</a></div>
      <div><span className="detail-label">LOCATION</span><span>Olongapo City, Philippines</span></div>
      <div><span className="detail-label">SOCIALS</span><span>Facebook · Instagram</span></div>
    </div>
  </main>;
}

function App() {
  return <BrowserRouter><div className="app-shell"><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Home />} />
  </Routes><Footer /></div></BrowserRouter>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
