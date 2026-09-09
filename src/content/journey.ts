export type Chapter = {
  id: string;
  place: string;
  region: string;
  years: string;
  /** Real-world location as [longitude, latitude] — plotted on the world map. */
  coords: [number, number];
  /** Which side of the map pin its label sits on. */
  label: "e" | "w" | "n" | "s";
  scene: "guwahati" | "bangalore" | "ireland";
  /** Short on-page narrative, shown as paragraphs. */
  body: string[];
  /** Tag chips shown under the chapter. */
  highlights: string[];
  /** Full voice-over transcript (also the ElevenLabs script). */
  transcript: string;
  /** Put an mp3 at public/audio/<file> to enable the player. */
  audioSrc?: string;
};

export const journey: Chapter[] = [
  {
    id: "guwahati",
    place: "Guwahati",
    region: "Assam, India",
    years: "2003 – 2017",
    coords: [91.75, 26.18],
    label: "e",
    scene: "guwahati",
    body: [
      "My story starts in Guwahati, in 2003, with our first family computer. I was the kid who needed to know what was happening behind the screen — why it did what it did.",
      "My father put it to work first: he had me typing up his tax audit reports in Word, and somewhere between the formatting and the formulas, I was hooked. When it came time to choose a stream in higher secondary, there was no debate — Computer Science.",
      "That's where I met C and C++, and first understood what a compiler really is: a translator turning what I wrote into something a machine could run. That idea — every system is just layers translating intent into action — is the one I've been chasing ever since.",
    ],
    highlights: ["First computer, 2003", "C / C++", "Compilers & interpreters"],
    transcript:
      "My story starts in Guwahati, in 2003, with our first family computer. I was the kid who needed to know what was happening behind the screen — why it did what it did. My father put it to work first: he had me typing up his tax audit reports in Word, and somewhere between the formatting and the formulas, I was hooked. By the time I had to choose a stream in higher secondary, there was no debate — Computer Science. That's where I met C and C++, and where I first understood what a compiler really is: a translator, turning what I wrote into something a machine could run — sometimes line by line, sometimes all at once. It sounds small, but that idea — that every system is just layers translating intent into action — is the one I've been chasing ever since.",
    audioSrc: "/audio/chapter-1-guwahati.mp3",
  },
  {
    id: "bangalore",
    place: "Bangalore",
    region: "Karnataka, India",
    years: "2017 – 2024",
    coords: [77.59, 12.97],
    label: "s",
    scene: "bangalore",
    body: [
      "Then Bangalore, for a BCA in IoT at Jain University. I finished in the first division — but the real learning happened around the edges: I built my first drone, prototyped a machine that used IoT to sort building waste, and ran the books for our cultural team as head of finance.",
      "After that came four years at Kaplan North America, building enterprise learning platforms in .NET and Angular. I was nominated for the Kaplan Way awards, won a few, and was named Star Performer of the Month more than once.",
      "Those years taught me how software actually ships — the reviews, the releases, the messy human parts. And through all of it, badminton was my reset button: fast, unforgiving, and very good at teaching you to stay calm under pressure.",
    ],
    highlights: [
      "BCA IoT — 1st division",
      "First drone + IoT waste sorter",
      "Head of Finance, cultural team",
      "Kaplan: .NET / Angular, 4 yrs",
      "Kaplan Way awards · Star Performer",
      "Badminton",
    ],
    transcript:
      "Then Bangalore, for a BCA in IoT at Jain University. I finished in the first division, but the real learning happened around the edges: I built my first drone, prototyped a machine that used IoT to sort building waste, and ran the books for our cultural team as head of finance. After that came four years at Kaplan North America, building enterprise learning platforms in .NET and Angular. I was nominated for the Kaplan Way awards, won a few, and was named Star Performer of the Month more than once. Those years taught me how software actually ships — the reviews, the releases, the messy human parts. And through all of it, badminton was my reset button: a fast, unforgiving game that made me better at staying calm under pressure. Bangalore is where I went from someone who liked building things to someone who could build them with a team, on a deadline, at scale.",
    audioSrc: "/audio/chapter-2-bangalore.mp3",
  },
  {
    id: "ireland",
    place: "Maynooth",
    region: "Ireland",
    years: "2024 – now",
    coords: [-6.59, 53.38],
    label: "w",
    scene: "ireland",
    body: [
      "And now, Ireland — an MSc in Computer Science at Maynooth University. Alongside my own studies I work as a demonstrator, sitting with students to help them through the parts of CS that don't click the first time. Teaching sharpened my own fundamentals more than anything else.",
      "At Unum, my Salesforce DevOps internship, I've been building AI-assisted tooling and CI/CD quality gates — cutting roughly 70% of the manual effort in plugin development. I also helped build a Microsoft-mentored subtitle translator on Next.js and Azure OpenAI, and a real-time risk monitor for renewable energy grids.",
      "Twenty years on from that first computer in Guwahati, I'm still asking the same question — how does this actually work — except now the answer is a pipeline I get to design. The reset button these days is golf and surfing on the Irish coast.",
    ],
    highlights: [
      "MSc CS — Maynooth University",
      "CS Demonstrator",
      "Unum — Salesforce DevOps",
      "AI-assisted tooling · CI/CD gates",
      "Golf · Surfing",
    ],
    transcript:
      "And now, Ireland — an MSc in Computer Science at Maynooth University. Alongside my own studies, I work as a demonstrator, sitting with students to help them through the parts of CS that don't click the first time — teaching turned out to sharpen my own fundamentals more than anything else. At Unum, in my Salesforce DevOps internship, I've been building AI-assisted tooling and CI/CD quality gates, cutting roughly seventy percent of the manual effort in plugin development. I also helped build a Microsoft-mentored subtitle translator on Next.js and Azure OpenAI, and a real-time risk monitor for renewable energy grids. Twenty years on from that first computer in Guwahati, I'm still asking the same question — how does this actually work — except now the answer is a pipeline I get to design. And the reset button? That's golf and surfing on the Irish coast now.",
    audioSrc: "/audio/chapter-3-ireland.mp3",
  },
];
