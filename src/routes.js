import Survey from "./components/surveys/Survey";
import Tag from "./components/tags/Tag";
import TagEdit from "./components/tags/TagEdit";

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
    path: "/users",
    component: Survey,
    title: "Users",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "success",
    icon: "fas fa-users",
  },
  {
    path: "/tags",
    component: Tag,
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
