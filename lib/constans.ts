type tag = {
  id: number;
  key: string;
  name: string;
};

export const TAG_OPTIONS: Record<string, tag[]> = {
  en: [
    { id: 1, key: "popular", name: "Hot" },
    { id: 2, key: "discount", name: "Discount" },
    { id: 3, key: "sold_out", name: "Sold out" },
    { id: 5, key: "new", name: "New" },
    { id: 6, key: "no_tag", name: "No tag" },
  ],
  pl: [
    { id: 1, key: "popular", name: "Najpopularniejsze" },
    { id: 2, key: "discount", name: "Promocja" },
    { id: 3, key: "sold_out", name: "Wyprzedane" },
    { id: 5, key: "new", name: "Nowość" },
    { id: 6, key: "no_tag", name: "Bez etykiety" },
  ],
};

export const ALLOWED_HTML_TAGS = [
  "b",
  "i",
  "em",
  "strong",
  "p",
  "br",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
];

export const ALLOWED_HTML_ATTRS = ["href", "target", "rel"];
