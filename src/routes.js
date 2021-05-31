import Survey from "./components/surveys/Survey";
import Tags from "./components/tags/Tags";
import TagEdit from "./components/tags/TagEdit";
import Users from "./components/users/Users";
import UserEdit from "./components/users/UserEdit";
import SurveyEdit from "./components/surveys/SurveyEdit";
import TakeSurvey from "./components/surveys/TakeSurvey";

export const routes = [
  {
    path: "/surveys",
    component: Survey,
    title: "Surveys",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "primary",
    icon: "fas fa-poll-h",
  },
  {
    path: "/survey/:id?",
    component: SurveyEdit
  },
  {
    path: "/take/survey/:id?",
    component: TakeSurvey
  },
  {
    path: "/users",
    component: Users,
    title: "Users",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "success",
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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "warning",
    icon: "fas fa-tags",
  },
  {
    path: "/tag/:id?",
    component: TagEdit,
  }
];
