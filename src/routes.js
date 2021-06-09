import Survey from "./components/surveys/Survey";
import Tags from "./components/tags/Tags";
import TagEdit from "./components/tags/TagEdit";
import Users from "./components/users/Users";
import UserEdit from "./components/users/UserEdit";
import SurveyEdit from "./components/surveys/SurveyEdit";
import TakeSurvey from "./components/surveys/TakeSurvey";
import SurveyResults from "./components/surveys/SurveyResults";

export const routes = [
  {
    path: "/surveys",
    component: Survey,
    title: "Surveys",
    icon: "fas fa-poll-h",
    only_coordinator: false,
  },
  {
    path: "/survey/:id?",
    component: SurveyEdit,
    exact: true,
    only_coordinator: true,
  },
  {
    path: "/survey/:id/take",
    component: TakeSurvey,
    exact: true,
    only_coordinator: false,
  },
  {
    path: "/survey/:id/results",
    component: SurveyResults,
    exact: true,
    only_coordinator: false,
  },
  {
    path: "/users",
    component: Users,
    title: "Users",
    icon: "fas fa-users",
    only_coordinator: true,
  },
  {
    path: "/user/:id?",
    component: UserEdit,
    only_coordinator: true,
  },
  {
    path: "/tags",
    component: Tags,
    title: "Tags",
    icon: "fas fa-tags",
    only_coordinator: true,
  },
  {
    path: "/tag/:id?",
    component: TagEdit,
    only_coordinator: true,
  },
];
