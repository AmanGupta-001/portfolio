import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// ── Hooks ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Nav ────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__logo">AG<span className="dot">.</span></div>
      <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className={active === l.toLowerCase() ? 'active' : ''}>
              {l}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        {[...Array(20)].map((_, i) => <div key={i} className="hero__particle" style={{ '--i': i }} />)}
      </div>
      <div className="hero__content">
        <div className="hero__tag">Available for opportunities</div>
        <h1 className="hero__name">
          <span className="hero__hi">Hi, I'm</span>
          <span className="hero__big">Aman<br />Gupta</span>
        </h1>
        <p className="hero__title">Full Stack Developer <span className="amp">&amp;</span> ML Enthusiast</p>
        <p className="hero__sub">B.Tech CS @ JIIT Noida · Building digital experiences that matter</p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">View My Work</a>
          <a href="#contact" className="btn btn--outline">Let's Talk</a>
        </div>
        <div className="hero__socials">
          <a href="https://www.linkedin.com/in/aman-gupta-632b14203" target="_blank" rel="noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="mailto:amangupta.05ob@gmail.com" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
            Email
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────
function About({ data }) {
  const [ref, vis] = useInView();
  return (
    <section id="about" className={`section about ${vis ? 'in-view' : ''}`} ref={ref}>
      <div className="section__inner">
        <div className="section__label">01 / About</div>
        <h2 className="section__title">Who I Am</h2>
        <div className="about__grid">
          <div className="about__avatar">
            <div className="avatar-ring">
              <div className="avatar-inner">AG</div>
            </div>
            <div className="avatar__chips">
              <span className="chip chip--teal">ReactJs</span>
              <span className="chip chip--red">Python</span>
              <span className="chip chip--yellow">C++</span>
              <span className="chip chip--green">ML</span>
            </div>
          </div>
          <div className="about__text">
            <p>I'm a <strong>third-year Computer Science student</strong> at JIIT Noida with a passion for building full-stack web applications and machine learning models. I love turning complex problems into elegant, user-friendly solutions.</p>
            <p>From crafting responsive UIs with React to building ML models with Scikit-learn, I enjoy working across the stack. My experience spans civic tech, healthcare prediction, and algorithmic problem-solving.</p>
            <div className="about__stats">
              {[['4+','Projects Built'],['94.5%','Board Score'],['2','Domains'],['2025','Team Lead']].map(([n,l])=>(
                <div className="stat" key={l}><span className="stat__num">{n}</span><span className="stat__label">{l}</span></div>
              ))}
            </div>
            <div className="about__edu">
              {data?.education?.map((e, i) => (
                <div className="edu-card" key={i}>
                  <div className="edu-card__period">{e.period}</div>
                  <div className="edu-card__title">{e.institution}</div>
                  <div className="edu-card__sub">{e.degree} — <strong>{e.score}</strong></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────────────
function Projects({ projects }) {
  const [ref, vis] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className={`section projects ${vis ? 'in-view' : ''}`} ref={ref}>
      <div className="section__inner">
        <div className="section__label">02 / Projects</div>
        <h2 className="section__title">What I've Built</h2>
        <div className="projects__grid">
          {projects?.map((p, i) => (
            <div className={`project-card ${active === i ? 'project-card--active' : ''}`}
              key={i} style={{ '--card-color': p.color, '--delay': `${i * 0.1}s` }}
              onClick={() => setActive(active === i ? null : i)}>
              <div className="project-card__accent" />
              <div className="project-card__num">0{i + 1}</div>
              <h3 className="project-card__name">{p.name}</h3>
              <p className="project-card__tagline">{p.tagline}</p>
              <div className={`project-card__body ${active === i ? 'project-card__body--open' : ''}`}>
                <p className="project-card__desc">{p.description}</p>
              </div>
              <div className="project-card__tech">
                {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
              </div>
              <div className="project-card__toggle">{active === i ? '−' : '+'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────
function Skills({ skills }) {
  const [ref, vis] = useInView();
  const icons = {
    'Languages': '⌨', 'Libraries & Frameworks': '📦', 'Tools': '🔧',
    'Databases': '🗄', 'Machine Learning': '🤖', 'Soft Skills': '🌟'
  };

  return (
    <section id="skills" className={`section skills ${vis ? 'in-view' : ''}`} ref={ref}>
      <div className="section__inner">
        <div className="section__label">03 / Skills</div>
        <h2 className="section__title">My Toolkit</h2>
        <div className="skills__grid">
          {skills && Object.entries(skills).map(([cat, items], i) => (
            <div className="skill-group" key={cat} style={{ '--delay': `${i * 0.08}s` }}>
              <div className="skill-group__header">
                <span className="skill-group__icon">{icons[cat]}</span>
                <h3 className="skill-group__title">{cat}</h3>
              </div>
              <div className="skill-group__tags">
                {items.map(s => <span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────
function Experience({ experience, achievements }) {
  const [ref, vis] = useInView();
  return (
    <section id="experience" className={`section experience ${vis ? 'in-view' : ''}`} ref={ref}>
      <div className="section__inner">
        <div className="section__label">04 / Experience</div>
        <h2 className="section__title">Journey So Far</h2>
        <div className="exp__grid">
          <div className="exp__left">
            <h3 className="exp__sub-title">Positions</h3>
            {experience?.map((e, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-card__dot" />
                <div className="exp-card__content">
                  <div className="exp-card__period">{e.period}</div>
                  <div className="exp-card__role">{e.role}</div>
                  <div className="exp-card__org">{e.org}</div>
                  <ul className="exp-card__points">
                    {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="exp__right">
            <h3 className="exp__sub-title">Achievements</h3>
            <div className="achievements">
              {achievements?.map((a, i) => (
                <div className="achievement" key={i} style={{ '--delay': `${i * 0.1}s` }}>
                  <span className="achievement__icon">★</span>
                  <span className="achievement__text">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────
function Contact() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <section id="contact" className={`section contact ${vis ? 'in-view' : ''}`} ref={ref}>
      <div className="section__inner">
        <div className="section__label">05 / Contact</div>
        <h2 className="section__title">Let's Connect</h2>
        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__blurb">Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.</p>
            <div className="contact__links">
              <a href="mailto:amangupta.05ob@gmail.com" className="contact__link">
                <span className="contact__link-icon">✉</span>
                amangupta.05ob@gmail.com
              </a>
              <a href="tel:+918960481388" className="contact__link">
                <span className="contact__link-icon">📞</span>
                +91-8960481388
              </a>
              <a href="https://www.linkedin.com/in/aman-gupta-632b14203" target="_blank" rel="noreferrer" className="contact__link">
                <span className="contact__link-icon">in</span>
                LinkedIn Profile
              </a>
            </div>
          </div>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Your Message" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} required />
            </div>
            {status === 'success' && <div className="form-success">Message sent! I'll get back to you soon ✓</div>}
            {status === 'error' && <div className="form-error">Something went wrong. Try emailing directly.</div>}
            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">AG<span className="dot">.</span></span>
        <span className="footer__copy">© 2025 Aman Gupta · Built with React & Node.js</span>
        <span className="footer__heart">Made with ♥ in Noida</span>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    fetch(`${API_BASE}/api/portfolio`)
      .then(r => r.json())
      .then(setData)
      .catch(() => console.warn('Backend not connected — UI still renders'));
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Nav active={activeSection} />
      <Hero />
      <About data={data} />
      <Projects projects={data?.projects} />
      <Skills skills={data?.skills} />
      <Experience experience={data?.experience} achievements={data?.achievements} />
      <Contact />
      <Footer />
    </div>
  );
}
