import axios from "axios";

const createApiService = () => {
  const token = localStorage.getItem("token");
  console.log("api", token);

  return axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
};

const apiService = createApiService();
console.log(apiService);

export default apiService;
