import Link from "next/link";
import type { Project } from "@/data/projects";
import styles from "./CaseStudyHeader.module.css";

interface CaseStudyHeaderProps {
  project: Project;
}

export default function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link href="/projects" className={styles.back}>
          ← All projects
        </Link>
        <h1>{project.name}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
        {project.repositoryUrl || project.liveUrl ? (
          <ul className={styles.links}>
            {project.repositoryUrl ? (
              <li>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                  <span className="visuallyHidden"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
            {project.liveUrl ? (
              <li>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live application
                  <span className="visuallyHidden"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        ) : null}
        <ul className={styles.themes}>
          {project.themes.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
