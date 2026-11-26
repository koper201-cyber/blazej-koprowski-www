import type { SiteData, Workshop } from "./site-schema";

export interface ViewModel {
  visible: Record<keyof SiteData["features"], boolean>;
  nav: { href: string; label: string }[];
  ctaLink: string | undefined;
  workshops: Workshop[];
}

type SectionKey = keyof SiteData["features"];

const DEFAULT_LABELS: Record<SectionKey, string> = {
  about: "O mnie",
  offer: "Oferta",
  products: "Produkty",
  workshops: "Warsztaty",
  testimonials: "Opinie",
  contact: "Kontakt",
};

export interface ViewOptions {
  /** Etykiety menu w danym języku. */
  labels?: Record<SectionKey, string>;
  /** Strona główna danego języka: "/" albo "/en/". */
  home?: string;
}

export function buildViewModel(
  data: SiteData,
  sections: Record<string, string>,
  today: string,
  options: ViewOptions = {},
): ViewModel {
  const labels = options.labels ?? DEFAULT_LABELS;
  const home = options.home ?? "/";
  const visible = {
    about: data.features.about && Boolean(sections["O mnie"]),
    offer: data.features.offer && data.offer.length > 0,
    products: data.features.products && data.products.length > 0,
    workshops: data.features.workshops,
    testimonials: data.features.testimonials && data.testimonials.length > 0,
    contact: data.features.contact,
  };
  const links: [SectionKey, string][] = [
    ["about", "o-mnie"],
    ["offer", "oferta"],
    ["products", "produkty"],
    ["workshops", "warsztaty"],
    ["testimonials", "opinie"],
    ["contact", "kontakt"],
  ];
  const nav = links
    .filter(([key]) => visible[key])
    .map(([key, id]) => ({ href: `${home}#${id}`, label: labels[key] }));
  const target = data.hero.cta_link;
  const id = target?.replace(/^\/?#/, "");
  const isAnchor = target?.startsWith("#") || target?.startsWith("/#");
  const anchorVisible = nav.some((link) => link.href === `${home}#${id}`);
  const anchorLink = home === "/" ? target : `#${id}`;
  let ctaLink = target;
  if (isAnchor) ctaLink = anchorVisible ? anchorLink : undefined;
  return {
    visible,
    nav,
    ctaLink,
    workshops: visible.workshops
      ? data.workshops
          .filter((w) => w.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date))
      : [],
  };
}
