import Swal from "sweetalert2";

export default defineNuxtRouteMiddleware((to, form) => {
  const localePath = useLocalePath()
  const { IsLoggedIn } = useAuth();

  if (to.fullPath.includes('token')) {
    const token = to.query.token ?? '';
    if (process.server) {
      return
    }
    const auth = useAuth();
    auth.SetUserData({

      accessToken: token
    })

    // const checkout = typeof window !== 'undefined' ? SetAccessToken(token.toString()): null
  }
  else if
    (IsLoggedIn() !== true) {

    Swal.fire({
      html: `
        <svg width="59" class="tw-mx-auto tw-my-4" height="53" viewBox="0 0 59 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.04167 39.3335L0.625 4.04183L18.2708 20.0835L29.5 0.833496L40.7292 20.0835L58.375 4.04183L51.9583 39.3335H7.04167ZM51.9583 48.9585C51.9583 50.8835 50.675 52.1668 48.75 52.1668H10.25C8.325 52.1668 7.04167 50.8835 7.04167 48.9585V45.7502H51.9583V48.9585Z" fill="#FF9C55"/>
        </svg>
        <h4>Requires login</h4>
        <p>You must be logged in to be able to generate dynamic codes</p>
        `,
      confirmButtonText: "Login",
      cancelButtonText: "Back",
      showCancelButton: true,
      confirmButtonColor: "#FFD736",
      cancelButtonColor: "#263238",
    }).then((res) => {
      if (res.isConfirmed) {
        navigateTo(localePath("/login"));
      } else {
        return abortNavigation();
      }
    });

    return abortNavigation()


  }


})