// PROVISIONAL DEMO NAME — CLIENT TO CONFIRM LEGAL/PUBLIC NAME
// All events and image slots are demonstration content, not verified activities.
export const organisation = {
  name: "AIM Germany",
  descriptor: "An Ambedkarite community concept",
  email: "", // Add a client-approved address. Never fabricate contact information.
  year: 2026,
  languages: ["DE", "EN"],
  images: {
    hero: "/ambedkar-hero.png",
    legacy: "/ambedkar-legacy.png",
    community: "/community-germany.jpg",
    gallery: Array.from({ length: 5 }, (_, i) => `/gallery/gallery-${i + 1}.jpg`),
  },
};
export const navigation = [
  ["Home", "home"], ["About", "about"], ["Dr. Ambedkar", "legacy"],
  ["Events", "events"], ["Resources", "resources"], ["Gallery", "gallery"],
  ["Get Involved", "get-involved"],
];
export const philosophy = [
  { name: "Liberty", text: "Human dignity for every individual." },
  { name: "Equality", text: "Equal opportunity without discrimination." },
  { name: "Fraternity", text: "A community united through mutual respect." },
];
export const pillars = [
  { name: "Educate", text: "Empowering people through knowledge, learning and awareness.", icon: "book" },
  { name: "Agitate", text: "Standing peacefully against discrimination and injustice.", icon: "voice" },
  { name: "Organize", text: "Bringing communities together for meaningful social progress.", icon: "people" },
];
export const events = [
  { title: "Ambedkar Jayanti", day: "14", month: "APR", category: "Celebration", theme: "jayanti", location: "Germany", status: "Details to be confirmed", isDemo: true },
  { title: "Community Gathering", day: "—", month: "TBC", category: "Community", theme: "gathering", location: "Germany", status: "Details to be confirmed", isDemo: true },
  { title: "Educational Seminar", day: "—", month: "TBC", category: "Learning", theme: "seminar", location: "Germany", status: "Details to be confirmed", isDemo: true },
];
export const values = [
  { title: "Education", text: "Knowledge as a foundation for empowerment.", icon: "book" },
  { title: "Equality", text: "Building a society where everyone is treated with dignity.", icon: "scale" },
  { title: "Community", text: "Connecting Ambedkarites across Germany.", icon: "people" },
  { title: "Social Awareness", text: "Creating conversations that encourage positive change.", icon: "voice" },
];
export const resources = [
  { title: "Dr. Ambedkar’s Writings", category: "Books & Speeches", icon: "book" },
  { title: "Ambedkarite History", category: "Articles & Learning", icon: "document" },
  { title: "Buddhist & Social Thought", category: "Educational Resources", icon: "light" },
];
