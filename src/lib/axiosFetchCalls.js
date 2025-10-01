import axiosInstance from "./globalAxios";

export const submitSignup = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      username,
      password,
    });
    return {
      status: "success",
      message: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Signup failed",
    };
  }
};

export const submitSignin = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/signin", {
      username,
      password,
    });
    return {
      status: "success",
      message: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Signin failed",
    };
  }
};
