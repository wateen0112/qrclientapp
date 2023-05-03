import { defineStore } from "pinia"
import { useAuth } from '~/composables/useAuth'
import { customerController } from '@/api/endpoints/customer'
import { useToast } from "vue-toastification";
import { useStorage } from '@vueuse/core'

const toast = useToast();
const { GET, POST, DELETE } = useApi();

export const useAuthorization = defineStore('AuthorizationStore', () => {
const localePath = useLocalePath();

    const { SetUserData } = useAuth();
    const authDto = ref({
        email: '',
        code: '',
        password: ''
    })

    async function forgetPassword(payload: any) {
        const response: any = await POST(customerController.FORGETPASSWORD, payload);
        if (response.data.isSuccess === true) {
            navigateTo({
                path: localePath('/resetPassword'),
                query: {
                    email: payload.email,

                }
            })
        }
    }

    async function resetPassword(payload: any) {
        const response: any = await POST(customerController.RESETPASSWORD, payload);
        if (response.status == 200) {
            navigateTo(localePath('/login'))
        }
    }

    async function createAccount(payload: any) {
        try {
            const response: any = await POST(customerController.CREATE_ACCOUNT, payload);
            if (response.data.isSuccess === true) {
                // storageEmail(payload.email)
                navigateTo({
                    path: localePath('/gotMail'),
                    query: {
                        email: payload.email,

                    }
                })
            }

        } catch (error: any) {
            if (error.response.status == 400) {
                toast.error(error.response.data.message)
            }
        }

    }

    async function confirmMail(payload: any) {
        const response = await POST(customerController.CONFIRMEMAIL, payload);

        if (response.status == 200) {
            navigateTo(localePath('/login'))
        }
    }

    async function resendConfirmMail(payload: any) {
        await POST(customerController.RESENDCONFIRMEEMAIL, payload, { success: 'تحقق بريدك الالكتروني لمعرفة رمز الادخال' });
    }
     function loginWithToken (token:string){
        useStorage('AccessToken',token)
    }
    return { loginWithToken,forgetPassword, createAccount, authDto, confirmMail, resendConfirmMail, resetPassword }
})