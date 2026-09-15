export const profile = {
  name: "Shelja Pugaliya",
  role: "Software & DevOps Engineer",
  tagline:
    "I make complex systems feel simple.\nFour years of building enterprise platforms at Kaplan, now designing developer tooling and CI/CD pipelines in Ireland.\n.Net| Angular| TypeScript| Python | CI/CD | Salesforce",
  location: "Dublin, Ireland",
  email: "pugaliyas8@gmail.com",
  links: {
    github: "https://github.com/Shelja-Pugaliya",
    linkedin: "https://www.linkedin.com/in/sheljapugaliya/",
  },
  // Drop your PDF at public/cv.pdf to enable the download button.
  cvPath: "/cv.pdf",
  // Opens the visitor's default mail app. Swap for a Gmail compose URL if you
  // prefer to force Gmail:
  // "https://mail.google.com/mail/?view=cm&fs=1&to=pugaliyas8@gmail.com&su=Hello%20Shelja"
  emailHref:
    "mailto:pugaliyas8@gmail.com?subject=Hello%20Shelja&body=Hi%20Shelja%2C%0A%0A",
} as const;

export type Profile = typeof profile;
