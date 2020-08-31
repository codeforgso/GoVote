import About from "./About";
import CanIVote from "./CanIVote";
import WhereAndWhen from "./WhereAndWhen";
import DayOfInfo from "./DayOfInfo";

const routes = [
  {
    to: "/about",
    component: About,
    label: "About",
    labelLong: "About the GoVoteGSO project",
  },
  {
    to: "/can-i-vote",
    component: CanIVote,
    label: "Can I Vote?",
  },
  {
    to: "/where-and-when",
    component: WhereAndWhen,
    label: "Where and When",
    labelLong: "Where and When To Vote",
  },
  {
    to: "/election-day",
    component: DayOfInfo,
    label: "Election Day",
    labelLong: "It's Election Day, What Do I Do?",
  },
  // deleted route to Candidate Info for 2020v1 per https://github.com/codeforgso/GoVote/pull/190
];

export default routes;
