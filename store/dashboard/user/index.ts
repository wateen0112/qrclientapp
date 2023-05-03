import { defineStore } from "pinia";
import { UserController } from "~/api/endpoints/userController";
import { PasswordDto } from "@/api/dto/dashboard/user.dto";
import { useApi } from "~/composables/useApi";
import { User } from "~/api/dto/dashboard/user.dto";
const api = useApi();
export const useUserStore = defineStore("user", () => {
  //State
  const passwordDto = ref<PasswordDto>(new PasswordDto());

  const profile = ref<User>({
    email: "",
    dateCreated: "",
    name: "",
    industryId: "",
    cityId: "",
    countryName: null,
    phoneNumber: null,
    company: null,
    street: null,
    website: null,
  });
  //Actions

  async function getUserProfile() {
    try {
      const res = await api.GET<User>(UserController.GET_PROFILE);
      profile.value = res.data;
      return res;
    } catch (err) {
      throw err;
    }
  }
  async function modifyProfile(payload) {
    try {
      const res = await api.POST(
        UserController.MODIFY_PROFILE,
        {
          ...payload,
        },
        {
          success: "تم تعديل الحساب بنجاح",
          error: "unexpxted error happend",
        }
      );
      profile.value = payload;
    } catch (err) {
      throw err;
    }
  }
  async function sendEmailConfirmCode(payload) {
    try {
      const res = await api.POST(UserController.MODIFY_EMAIL, payload);
    } catch (error) {
      throw error;
    }
  }

  async function changePassword(payload: any) {
    const res = await api.POST(UserController.Change_Password, payload, {
      error: false,
      success: 'تمت تغيير كلمة المرور بنجاح',
    });
  }

  return {
    profile,
    getUserProfile,
    modifyProfile,
    sendEmailConfirmCode,
    passwordDto,
    changePassword,
  };
});
