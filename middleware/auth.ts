
import { useAuth } from "~/composables/useAuth";
export default defineNuxtRouteMiddleware((to, form) => {
    const { IsLoggedIn } = useAuth();
    const localPath = useLocalePath()
    
    if (to.fullPath.includes('token')) {
        const token = to.query.token ?? '';
        if (process.server) {
            return
        }
        const auth = useAuth();
        auth.SetUserData({

            accessToken: token
        })
        console.log('is logged in ?  ', IsLoggedIn());

        // const checkout = typeof window !== 'undefined' ? SetAccessToken(token.toString()): null
    }

    else {

        if (!IsLoggedIn()) {
            navigateTo(localPath('/login'))
        }

    }

})