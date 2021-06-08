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
  },
  {
    path: "/survey/:id?",
    component: SurveyEdit,
    exact: true,
  },
  {
    path: "/survey/:id/take",
    component: TakeSurvey,
    exact: true,
  },
  {
    path: "/survey/:id/results",
    component: SurveyResults,
    exact: true,
  },
  {
    path: "/users",
    component: Users,
    title: "Users",
    icon: "fas fa-users",
  },
  {
    path: "/user/:id?",
    component: UserEdit,
  },
  {
    path: "/tags",
    component: Tags,
    title: "Tags",
    icon: "fas fa-tags",
  },
  {
    path: "/tag/:id?",
    component: TagEdit,
  },
];
