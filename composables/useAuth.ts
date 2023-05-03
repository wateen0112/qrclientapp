import { BaseRoles } from "@/api/enums/Roles";
import { axiosIns } from "@/libs/axios";
import jwt_decode from "jwt-decode";
import type { AxiosError, AxiosResponse } from "axios";
import { UserData } from "~/api/dto/dashboard/auth";
import { useToast } from "vue-toastification";
import appConfig from "~/app.config";
import { customerController } from "~/api/endpoints/customer";

type useAuthconfig = {
  baseUrl: string;
  loginEndpoint: string;
  refreshTokenEndPoint: string;
  key: string;
};
const defaultConfig: useAuthconfig = {
  baseUrl: appConfig.API_DOMAIN,
  loginEndpoint: customerController.LOGIN,
  refreshTokenEndPoint: "",
  key: "qr",
};

export const useAuth = (config: useAuthconfig = defaultConfig) => {
  const toast = useToast();

  const { POST } = useApi();

  async function EmailLogin(payload: any) {
    const localePath = useLocalePath()
    try {
      const response = await POST(config.loginEndpoint, payload, {
        comfirm: false,
        success: false,
        error: false,
      });
      if (response.status === 200) {
        SetUserData(response.data);
        navigateTo(localePath("/dashboard/home"));
        return response;
      }
    } catch (er) {
      const result = HandleLoginError(er as AxiosError, payload);

      toast.error(result);
      // throw new Error(result?.message);
    }
  }
  function SetUserData(userData: any) {
    const userCookie = useCookie(`${config.key}-user-data`, {
      expires: new Date(new Date().getFullYear() + 2, 0)
    });
    userCookie.value = userData;
  }
  function GetUserData() {
    const cookie = useCookie<UserData>(`${config.key}-user-data`);
    return cookie.value;
  }
  function GetAccessToken() {
    const userData = useCookie<UserData>(`${config.key}-user-data`);
    if (userData.value && userData.value.accessToken) {
      return userData.value.accessToken;
    } else return null;
  }
  function GetAccessTokenDecoded(): any {
    if (GetAccessToken()) return jwt_decode(GetAccessToken() as string);
    else return null;
  }
  function IsAdmin() {
    return (
      GetUserRoles()?.includes(BaseRoles.SuperAdmin) ||
      GetUserRoles()?.includes(BaseRoles.Admin)
    );
  }
  function GetRefreshToken() {
    return GetUserData()?.refreshToken;
  }
  function GetUserRoles() {
    return GetAccessTokenDecoded()?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  }
  function IsLoggedIn() {
    return !!GetAccessToken();
  }
  function LogOut() {
    const localePath = useLocalePath()
    useCookie(`${config.key}-user-data`).value = null;
    navigateTo(localePath("/login"));
  }
  function ActionsGaurd(name: string, action: string) {
    if (name === "Public") return true;
    return (
      GetUserRoles()?.includes(`${name}-${action}`) ||
      GetUserRoles()?.includes(BaseRoles.SuperAdmin)
    );
  }
  async function RefreshToken() {
    try {
      const response = await axiosIns.post("Dashboard/User/RefreshToken",
        {
          id: GetUserData()?.id,
          refreshToken: GetRefreshToken(),
        },
      );
      const { accessToken } = response.data;
      if (!accessToken) {
        LogOut();
      }
      SetUserData({
        ...GetUserData(),
        accessToken
      });

      return accessToken;
    } catch (error) {
      LogOut();
    }
  }
  function HandleLoginError(error: Error & AxiosError, requestBody: any) {
    const localePath = useLocalePath()

    if (error.response) {
      if (error.response.status == 404 || error.response.status == 403)
        return "المستخدم غير موجود .. يرجى التحقق من صحة المعلومات";
      else if (error.response.status == 400)
        return "كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف ";
      else if (
        error.response.status == 401 &&
        error.response.data === "confirm your email first"
      ) {
        navigateTo(localePath(`/gotMail?email=${requestBody.email}`));
        return "يرجى تأكيد البريد الالكتروني اولا";
      } else if (error.response.status == 500)
        return "حدث خطأ في الخادم .. يرجى اعادة المحاولة";
      else return "حدث خطأ ما";
    } else return "فشلت العملية";
  }
  function GetHomePage() {
    if (IsLoggedIn()) {
      return "/dashboard";
    } else return "/";
  }
  function SetAccessToken(token = '') {
    try {
      localStorage.setItem("AccessToken", token)
    } catch (error) {
      throw error
    }
  }
  return {
    SetAccessToken,
    GetAccessToken,
    IsAdmin,
    GetRefreshToken,
    GetUserRoles,
    IsLoggedIn,
    LogOut,
    GetUserData,
    ActionsGaurd,
    GetAccessTokenDecoded,
    RefreshToken,
    EmailLogin,
    SetUserData,
    // HandleLoginResponse,
    // HandleLoginError,
    GetHomePage,
  };
};
