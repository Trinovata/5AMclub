/**
 * The team.
 *
 * WHY THE AWARDS AND NOT JOB TITLES
 * The archive contains no staff directory, no roles, and no bios — inventing
 * them would be fabrication on a client site, which is a hard rule here. What it
 * does contain is a full set of photographs from the shop's own staff awards:
 * each person holding a certificate the business printed, with their name and
 * the award written on it.
 *
 * So every name and every title below is READ OFF A PHOTOGRAPH the business
 * published itself. Nothing is inferred, nothing is embellished, and the section
 * says something truer than a row of invented job titles would: this is a place
 * that gives its staff an award for being calm under pressure.
 *
 * `note` is the certificate's own citation where it was legible. Where it was
 * not, the field is absent rather than guessed at.
 *
 * BEFORE LAUNCH: confirm with the client that every person here is happy to be
 * named on the website. Published on Instagram is not the same as consent to
 * appear on a business's front page.
 */

export type TeamMember = {
  name: string;
  award: string;
  image: string;
  imageAlt: string;
  note?: string;
};

export const team: TeamMember[] = [
  {
    name: "Jordan Cumberbatch",
    award: "Most Calm Under Pressure",
    image: "/media/archive/most-calm-under-pressure.jpg",
    imageAlt: "Jordan Cumberbatch smiles while holding his Most Calm Under Pressure certificate in the café.",
    note: "For remaining composed, focused and efficient when it gets busy.",
  },
  {
    name: "Justin Singh",
    award: "Best Barista-R",
    image: "/media/archive/best-barista-santa-hat.jpg",
    imageAlt: "Justin Singh, in a Santa hat, holds up his Best Barista-R award certificate.",
  },
  {
    name: "Stephanie Freakley",
    award: "5AM's Shining Star",
    image: "/media/archive/shining-star-staff-award.jpg",
    imageAlt: "Stephanie Freakley, in a pink patterned hat, smiles holding her Shining Star certificate.",
  },
  {
    name: "Jaeda Alexander",
    award: "5AM's Secret Weapon",
    image: "/media/archive/5am-s-secret-weapon.jpg",
    imageAlt: "Jaeda Alexander, in a Santa hat, holds her 5AM's Secret Weapon certificate by the pastry case.",
  },
  {
    name: "Joel Mark",
    award: "Most Committed & Dedicated",
    image: "/media/archive/most-committed-and-dedicated.jpg",
    imageAlt: "Joel Mark, in a black beanie, holds his Most Committed and Dedicated certificate.",
  },
  {
    name: "Kelly Marie St Bernard",
    award: "All Rounder",
    image: "/media/archive/all-rounder-playful.jpg",
    imageAlt: "Kelly Marie St Bernard sticks her tongue out playfully while holding her All Rounder certificate.",
  },
  {
    name: "Tyrick Romany",
    award: "Most Calm Under Pressure",
    image: "/media/archive/most-calm-under-pressure-2.jpg",
    imageAlt: "Tyrick Romany, with long locs, smiles holding his Most Calm Under Pressure certificate.",
  },
  {
    name: "Jude Kay",
    award: "Positivi-Tea",
    image: "/media/archive/positivi-tea-award.jpg",
    imageAlt: "Jude Kay blows a kiss to the camera while holding the Positivi-Tea award certificate.",
  },
  {
    name: "Girish Fraser",
    award: "Most Adaptive",
    image: "/media/archive/most-adaptive-award.jpg",
    imageAlt: "Girish Fraser, in a beanie and glasses, smiles holding his Most Adaptive certificate.",
  },
  {
    name: "Meyna Campbell-Thomas",
    award: "Most Willing",
    image: "/media/archive/most-willing-award.jpg",
    imageAlt: "Meyna Campbell-Thomas, wearing red hair clips, holds her Most Willing certificate.",
  },
  {
    name: "Sipporah Charles",
    award: "Most Focused",
    image: "/media/archive/most-focused-team-cheer.jpg",
    imageAlt: "Sipporah Charles holds her Most Focused certificate while coworkers gather around her, smiling.",
  },
];
