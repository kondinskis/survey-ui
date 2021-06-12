import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export const useAxios = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [axiosInstance] = useState(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
    });

    const refreshToken = async () => {
      const { data } = await instance.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
        }
      );
      return data.access_token;
    };

    instance.interceptors.request.use(
      (config) => {
        // add Authorization header to every api call expect apis containing /auth
        if (
          !config.url.includes("/auth") &&
          localStorage.getItem("access_token")
        ) {
          config.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("access_token")}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;

        if (request.url.includes("/auth/refresh")) {
          return Promise.reject(error);
        }

        // if call fails try refreshing the token,
        // if the token cannot be refreshed redirect to login
        const { message } = error.response.data;
        if (error.response.status === 401 && !request._retry) {
          if (message === "Token has expired") {
            request._retry = true;
            try {
              const access_token = await refreshToken();
              localStorage.setItem("access_token", access_token);

              // retry failed request with refreshed token
              request.headers["Authorization"] = `Bearer ${access_token}`;
              return instance(request);
            } catch (e) {
              localStorage.clear();
              history.push("/login");
            }
          }
        }
        let toastMsg = message;
        if (message === "Token has expired") {
          toastMsg = "Session has expired";
        }

        addToast(toastMsg, { appearance: "error" });
        return Promise.reject(error);
      }
    );

    return instance;
  });

  return axiosInstance;
};

const o = { useAxios };

export default o;
