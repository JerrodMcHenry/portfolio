import Link from "next/link";
import { siteConfig } from "@/data/site";
import { getContactLinks } from "@/data/contact";
import styles from "./Hero.module.css";

export default function Hero() {
  const resumeLink = getContactLinks().find((link) => link.label === "Resume");

  return (
    <section className={`container ${styles.hero}`}>
      <h1>{siteConfig.name}</h1>
      <p className={styles.role}>{siteConfig.tagline}</p>
      <p className={styles.summary}>
        I build backend systems and AI-enabled products where deterministic
        code owns correctness: FastAPI and PostgreSQL services, LLM pipelines
        whose output is validated before it can affect a result, and the
        tests and documentation behind them. I&apos;m seeking Backend
        Software Engineer, Software Engineer, and Applied AI Engineer roles.
      </p>
      <p className={styles.background}>
        I came to software engineering from technical and customer-facing
        roles at Apple and software companies, where working alongside
        engineering teams led me to study computer science and software
        engineering.
      </p>
      <div className={styles.actions}>
        <Link href="/projects" className={styles.primary}>
          View Projects
        </Link>
        <Link href="/engineering">Engineering Evidence</Link>
        {resumeLink ? <a href={resumeLink.href}>{resumeLink.label}</a> : null}
      </div>
    </section>
  );
}
