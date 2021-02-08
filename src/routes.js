import Survey from "./components/surveys/Survey";

export const routes = [
  {
    path: "/",
    component: Survey,
    exact: true,
    title: "Surveys",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "primary",
    icon: "fas fa-poll-h",
  },
  {
    path: "/users",
    component: Survey,
    exact: true,
    title: "Users",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "success",
    icon: "fas fa-users",
  },
  {
    path: "/tags",
    component: Survey,
    exact: true,
    title: "Tags",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "warning",
    icon: "fas fa-tags",
  },
];
