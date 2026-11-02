export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Jerrod McHenry",
  tagline: "Software Engineer — Backend & Applied AI",
  description:
    "Software engineering portfolio of Jerrod McHenry, seeking Backend Software Engineer, Software Engineer, and Applied AI Engineer roles: backend systems and production AI, with case studies covering architecture, testing, and security.",
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Engineering", href: "/engineering" },
    { label: "About", href: "/about" },
  ] as NavItem[],
};
