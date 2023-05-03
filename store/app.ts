import { Layouts } from '../app/enums/index';
import { defineStore } from "pinia"
import { ref } from "vue"
import { version } from '../package.json'

export const useAppStore = defineStore('app', () => {

  const appVersion = ref(version)

  const qrDialog = ref(false);
  function setQrDialog(is: boolean) {
    qrDialog.value = is;
  }
  // ? STATE 
  const Sidebar = ref()
  const ActiveLayout = ref(Layouts.Dashboard);
  const ActiveTheme = ref('light')
  //  ?ACTIONS 
  function SET_SIDE_BAR(is: boolean) {
    Sidebar.value = is

  }

  function SET_THEME(theme: string) {
    ActiveTheme.value = theme
  }
  function SET_LAYOUT(layout: Layouts) {
    ActiveLayout.value = layout
  }
  return { SET_SIDE_BAR, SET_THEME, SET_LAYOUT, ActiveTheme, Sidebar, ActiveLayout, appVersion, qrDialog, setQrDialog }
})