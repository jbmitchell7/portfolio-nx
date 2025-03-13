interface Education {
  location: string;
  diploma: string;
  dates: string;
  description: string;

}

export const education: Education[] = [
  {
    location: "Career Foundry",
    diploma: "Intro to Frontend Development and Full-Stack Immersion",
    dates: "July 2021-February 2022",
    description: ""
  },
  {
    location: "University of Minnesota, Morris",
    diploma: "Computer Science BA",
    dates: "August 2013-May 2017",
    description: ""
  }
];

interface Work {
  title: string;
  dates: string;
  description: string;
}

export const work: Work[] = [
  {
    title: "Software Developer",
    dates: "September 2023-Present",
    description: "Full stack development on enterprise-level software primarily working in Angular"
  },
  {
    title: "IT Specialist",
    dates: "June 2017-August 2022",
    description: "Primary IT Manager for 4 different clients"
  },
  {
    title: "IT Intern",
    dates: "June 2016-May 2017",
    description: "Performed help desk duties such as Office 365 administration and hardware setup while in college."
  }
]