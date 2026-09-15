export type Chapter = {
  id: string;
  place: string;
  region: string;
  years: string;
  /** Real-world location as [longitude, latitude] — plotted on the world map. */
  coords: [number, number];
  /** Which side of the map pin its label sits on. */
  label: "e" | "w" | "n" | "s";
  /** Chapter photo — a file under `public/` (see public/images/). */
  image: string;
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
    image: "/images/guwahati.jpg",
    body: [
      "It started in 2003 with our first family computer. I was the kid who needed to know what was happening behind the screen. My father put it to work first, having me type up his tax audit reports in Word. Somewhere between the formatting and the formulas, I was hooked.",
      "When it came time to choose a stream in higher secondary, there was no debate. Computer Science. That's where I met C and C++, and first understood what a compiler actually does: turn what I write into something a machine can run. That idea, that every system is just layers translating intent into action, is the one I've kept chasing.",
      "Off the Clock - Before I ever wrote a line of code, I was learning Photoshop and CorelDraw at Don Bosco Institute, just to see what I could make. I was also a regular swimmer and ended up teaching others in the pool. Apparently helping people figure things out has been the pattern longer than I realized."
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
    image: "/images/bangalore.jpg",
    body: [
      "A BCA in IoT at Jain University, finished in the first division. But the real learning happened around the edges. I built my first drone, prototyped a machine that used IoT sensors to sort building waste, and ran finances for our cultural team as head of the committee.",
      "Then came four years at Kaplan North America, building enterprise learning platforms in .NET and Angular. I was named Star Performer of the Month more than once and nominated for the Kaplan Way awards. Those years taught me how software actually ships. Not the textbook version. The real one: code reviews at 11pm, releases that don't go as planned, the messy human coordination that no framework abstracts away.",
      "Off the Clock - Badminton. Every single day. It was fast, unforgiving, and very good at teaching you to stay calm when the point isn't going your way.",
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
    place: "Dublin",
    region: "Ireland",
    years: "2024 – now",
    coords: [-6.59, 53.38],
    label: "w",
    image: "/images/dublin.jpg",
    body: [
      "An MSc in Computer Science at Maynooth University, alongside work as a demonstrator. Sitting with students while they wrestle with the parts of CS that didn't click the first time has sharpened my own fundamentals more than anything else. Teaching forces you to actually know what you claim to know.",
      "At Unum, my Salesforce DevOps internship, I built AI-assisted tooling and CI/CD quality gates that cut roughly 70% of manual effort in plugin development. I also helped build a Microsoft-mentored subtitle translator on Next.js and Azure OpenAI, and a real-time risk monitor for renewable energy grids.",
      "Off the Clock - I work part-time at REISS because an MSc in Dublin doesn't fund itself and I'd rather hustle than wait. The rest of my free time goes to a golf course or the Irish coast, where I'm slowly getting less terrible at surfing.",
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
