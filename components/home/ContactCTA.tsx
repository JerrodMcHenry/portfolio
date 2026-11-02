import { getContactLinks } from "@/data/contact";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  const links = getContactLinks();

  return (
    <div className={styles.section}>
      <p>
        Interested in the engineering behind these systems, or in working
        together?
      </p>
      {links.length > 0 ? (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="visuallyHidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <a href={link.href}>{link.label}</a>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
