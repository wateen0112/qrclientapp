import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { GetAllFolder } from "~/api/dto/dashboard/folder";
import { FolderController } from "~/api/endpoints/folder";

const api = useApi();
export const useFolderStore = defineStore("folder", () => {
  //State
  const folderList = ref<GetAllFolder[]>([]);

  //Actions
  async function GetAllFolder() {
    try {
      const response = await api.GET<GetAllFolder[]>(
        FolderController.GET_FOLDER
      );
      folderList.value = response.data;
      return response;
    } catch (er) {
    }
  }

  async function AddFolder(payload: any) {
    const response = await api.POST(FolderController.ADD_FOLDER, payload);
    folderList.value?.unshift({ ...payload });
  }

  return { GetAllFolder, AddFolder, folderList };
});
