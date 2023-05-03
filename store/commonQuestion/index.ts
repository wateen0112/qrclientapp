import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { CommonQuestionController } from "@/api/endpoints/commonQuestion";
import { GetAllCommonQuestion } from "~/api/dto/website/commandQuestion.dto";
const api = useApi();

export const useQuestion= defineStore("commonQuestion", () => {
  //State
  const commonQuestion = ref<GetAllCommonQuestion[]>([]);

  //Actions

  //get All Common Question
  async function GetAllCommonQuestion() {
      const response = await api.GET<CommonQuestionController[]>(
        CommonQuestionController.Common_Question
      );
      commonQuestion.value = response.data;
      return response;
    
  }

  return {
    GetAllCommonQuestion,
    commonQuestion,
  };
});
