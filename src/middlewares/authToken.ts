import { useStore } from '@/stores/store';
import axios from 'axios';

export const authTokenValidationMiddleware = () => {
    const state = useStore();
    const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();

    const authToken = getCookieValue('auth_token');
    const authTokenValid = authToken?.split('.')[1];

    if (authToken && !authTokenValid) {
        state.showNotification('Invalid authorization', true);
        document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    if (authToken && authTokenValid) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        const userData = window.atob(authTokenValid);
        const userId = JSON.parse(userData).sub;
        state.user(userId);
    }   
}
