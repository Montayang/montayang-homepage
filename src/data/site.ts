// Edit personal content here. Empty values intentionally produce no broken links.
export const site = {
  name: "Xinyang Yang",
  brand: "Montayang",
  role: "PhD Student",
  institution: "National University of Singapore",
  department: "School of Computing",
  description:
    "Xinyang Yang is a PhD student at the National University of Singapore, with research interests in zero-knowledge proofs, cryptography, and graph algorithms.",
  background:
    "Before joining NUS in 2024, I received my B.Eng. in Computer Science from Shanghai Jiao Tong University, where I was a member of the ACM Class.",
  quantInterest: "I am also interested in quantitative research, particularly systematic trading strategies and reproducible backtesting.",
  advisors: [
    { name: "Jiaheng Zhang", url: "https://zjhzjh123.github.io/" },
    { name: "Yu Chen", url: "https://sites.google.com/view/chenyu94" },
  ],
  github: "https://github.com/Montayang",
  avatar: "/profile.jpg",
  email: "montayang@gmail.com",
  emailDisplay: "montayang at gmail dot com",
  cv: "/cv.pdf",
};
export const research = [
  {
    id: "cryptography",
    number: "01",
    title: "Zero-knowledge proofs & cryptography",
    description:
      "Efficient zero-knowledge proof systems, succinct range proofs, and verifiable approximate nearest-neighbor retrieval.",
    keywords: ["Zero-knowledge proofs", "Cryptography"],
    todo: "",
  },
  {
    id: "graphs",
    number: "02",
    title: "Graph algorithms",
    description:
      "The multicommodity flow-cut gap in directed graphs, with a focus on directed Okamura–Seymour graphs.",
    keywords: ["Graph theory", "Algorithms"],
    todo: "",
  },
];
export interface Publication {
  title: string;
  authors: string;
  venue?: string;
  year?: string;
  url?: string;
}
// Title and authors verified against the USENIX proceedings page.
export const publication: Publication = {
  title:
    "Rarus: A Succinct and Efficient Range Proof for Polynomial-based Vector Commitment",
  authors: "Xinyang Yang*, Wenjie Qu*, Yanpei Guo, and Jiaheng Zhang",
  venue: "USENIX Security",
  year: "2026",
  url: "https://eprint.iacr.org/2026/1440",
};
export interface Project {
  title: string;
  category: string;
  description: string;
  url?: string;
  pending?: boolean;
}
export const projects: Project[] = [
  {
    title: "BFBT",
    category: "Quantitative research",
    description:
      "A reproducible research and backtesting framework for Binance futures.",
    url: "https://github.com/Montayang/bfbt",
  },
  {
    title: "PromptPerp",
    category: "Trading infrastructure",
    description:
      "AI-assisted futures trading infrastructure with approval-based execution and risk controls.",
    url: "https://github.com/Montayang/promptperp",
  },
];
