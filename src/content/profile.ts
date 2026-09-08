export const profile = {
  name: "Shelja Pugaliya",
  role: "Software & DevOps Engineer",
  tagline:
    "MSc Computer Science, 4+ years full-stack (.NET, Angular, TypeScript). Building reliable, scalable systems — and the pipelines that ship them.",
  location: "Dublin, Ireland",
  email: "pugaliyas8@gmail.com",
  links: {
    github: "https://github.com/Shelja-Pugaliya",
    linkedin: "https://www.linkedin.com/in/sheljapugaliya/",
  },
  // Drop your PDF at public/cv.pdf to enable the download button.
  cvPath: "/cv.pdf",
} as const;

export type Profile = typeof profile;
