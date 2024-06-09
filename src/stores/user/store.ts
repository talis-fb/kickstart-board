import { defineStore } from 'pinia';
import { signup } from './actions/signup';
import { login } from './actions/login';
import { user } from './actions/user';
import { reset } from './actions/reset';
import { resetUsers } from './actions/resetUsers';
import { oauthLogin } from './actions/oauthLogin';
import { oauthSignup } from './actions/oauthSignup';

export const useStore = defineStore({
  id: 'store',
  state() {
    return {
      activeUser: {
        accessToken: '',
        email: '',
        id: 0,
        loggedIn: false,
      },
      signupForm: {
        email: '',
        password: '',
        welcomeEmail: false,
      },
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  actions: {
    signup,
    login,
    oauthLogin,
    oauthSignup,
    user,
    reset,
    resetUsers,
  },
});
