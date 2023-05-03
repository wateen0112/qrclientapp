import { isTemplateNode } from '@vue/compiler-core';
import {defineStore} from 'pinia';
import  { Industry} from '~/api/dto/dashboard/industry.dto';
import { SettingsController } from '~/api/endpoints/settings';
const api = useApi();
export const useIndustryStore  = defineStore('industry',()=>{
const industries = ref<Array<Industry>>([]);
async function getAllData (){
try  {
const res =await api.GET<Array<Industry>>(SettingsController.GET_ALL_INDUSTRY);
industries.value  = res.data;
return res  ; 
}
catch(err){
    throw(err);
}

 }
async function addIndustry (payload:any){
try {
    const res =  api.POST(SettingsController.UPER_SET_INDUSTTY)
}
catch (err){

}
}
async function deleteIndustry (payload:any){
    try  {
const res = await api.DELETE(SettingsController.DELETE_INDUSTRY,payload);
industries.value= industries.value.filter((item:any) =>{
    item . id !=payload
} )
    }
    catch(err){

    }
}
 return  {industries,getAllData}
})