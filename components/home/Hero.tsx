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
        I&apos;ve spent my career in and around technology from the start. From
        hands-on technical roles at Apple to customer-facing roles at software
        companies. Working directly with engineering teams along the way led me
        to study computer science and software engineering while continuing my
        career. I now build backend systems and AI-enabled products, including
        VentureGPS and Economic Intelligence, as I work toward my first
        professional software engineering role.
      </p>
      <div className={styles.actions}>
        <Link href="/projects" className={styles.primary}>
          View Projects
        </Link>
        <Link href="/engineering">Engineering Evidence</Link>
        {resumeLink ? (
          <Link href={resumeLink.href}>{resumeLink.label}</Link>
        ) : null}
      </div>
    </section>
  );
}
