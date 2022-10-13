import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.lastname,
    phonenumber: user.phonenumber,
    email: user.email,
    password: user.password,
    isProvider: user.isProvider,
  });
}
