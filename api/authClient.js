import { ApiClient } from "./apiClient";

let client = new ApiClient();

export default {
    login(data) {
      return client.post('/auth/login', data);
    },
};