import About from "./About";
import CanIVote from "./CanIVote";
import WhereAndWhen from "./WhereAndWhen";
import DayOfInfo from "./DayOfInfo";
//import Candidates from './Candidates';

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
  /*{
    to: '/candidates',
    component: Candidates,
    label: 'Candidates',
    labelLong: 'Who Are The Candidates?',
  },*/
];

export default routes;
