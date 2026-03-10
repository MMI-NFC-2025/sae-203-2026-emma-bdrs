export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/festival", label: "Le Festival" },
  { href: "/programme", label: "Programme" },
  { href: "/artistes", label: "Artistes" },
  { href: "/scenes", label: "Scènes" },
  { href: "/infos", label: "Infos pratiques" },
  { href: "/contact", label: "Contact" },
  { href: "/connexion", label: "Connexion" },
];
