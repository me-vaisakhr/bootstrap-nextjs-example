import axios from 'axios';

const getClient = url => {
  const options = {
    baseURL: url 
  };

  const client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(
      requestConfig => {
        return requestConfig;
      },
      requestError => {
        return Promise.reject(requestError);
      }
    );

    client.interceptors.response.use(
      response => {
        return Promise.resolve(response);
      },
      error => {
        return Promise.reject(error);
      }
    );
  return client;
};

class ApiClient {
  constructor(url = null) {
    this.client = getClient(url);
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient()
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
