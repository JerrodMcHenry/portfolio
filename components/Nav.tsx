"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./Nav.module.css";

/**
 * `"page"` on the item's own route; `"true"` on routes nested under it
 * (e.g. Projects while viewing a case study), where the item marks the
 * current section rather than the current page.
 */
function ariaCurrentFor(pathname: string, href: string) {
  if (pathname === href) return "page";
  if (pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the mobile menu is open, Escape closes it and returns focus to
  // the toggle; a pointer press anywhere outside the nav closes it too.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Primary">
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="visuallyHidden">
          {open ? "Close menu" : "Open menu"}
        </span>
        <span className={styles.icon} aria-hidden="true" />
      </button>
      <ul
        id="primary-navigation"
        className={styles.list}
        data-open={open}
      >
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={ariaCurrentFor(pathname, item.href)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
