import axios from 'axios';
import cookie from 'js-cookie';
import { push } from 'connected-react-router';
import {store} from '../index.js';
import {history} from '../redux/configureStore';
import Utils from '../helpers/utils';
import { STORAGE_KEYS } from "../constants";

const getClient = url => {
  const options = {
    baseURL:
      url ||
      process.env.API_KEY,
  };

  const client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(
      requestConfig => {
        if (Utils.getFromLocalStorage(STORAGE_KEYS.USER)) {
          requestConfig.headers.USERID= JSON.parse(Utils.getFromLocalStorage(STORAGE_KEYS.USER)).userId;
        }
        const token = Utils.getFromLocalStorage(STORAGE_KEYS.TOKEN)||'';
        if(token)
        {
          requestConfig.headers.Authorization= `Bearer ${token}`;
        }
        
        return requestConfig;
      },
      requestError => {
        return Promise.reject(requestError);
      }
    );

    // Add a response interceptor
    client.interceptors.response.use(
      response => {
        if (response.data.status === 401) {
          //if 401 - unauthorised comes redirect to login page.
          if(history.location.pathname !== '/login'){
            Utils.removeFromLocalStorage(STORAGE_KEYS.USER);
            Utils.removeFromLocalStorage(STORAGE_KEYS.TOKEN);
            store.dispatch(push('/login',{state:history.location.pathname}));
          }
        }
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
