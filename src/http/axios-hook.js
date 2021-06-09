import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const useAxios = () => {
  const history = useHistory();

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
        if (!config.url.includes("/auth") && localStorage.getItem("access_token")) {
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

        // if call fails try refreshing the token,
        // if the token cannot be refreshed redirect to login
        if (error.response.status === 401 && !request._retry) {
          const { msg } = error.response.data;
          if (msg === "Token has expired") {
            request._retry = true;
            try {
              const access_token = await refreshToken();
              localStorage.setItem("access_token", access_token);

              // retry failed request with refreshed token
              request.headers["Authorization"] = `Bearer ${access_token}`;
              return instance(request);
            } catch (e) {
              history.push("/login");
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  });

  return axiosInstance;
};

const o = { useAxios };

export default o;
