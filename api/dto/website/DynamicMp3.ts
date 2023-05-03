export interface DynamicMp3Dto { 
    primaryColor:string
    buttonColor :string
    imageFile?:any[]
    mp3File?:any[]
    title:string
    moreInfo:string
    website:string
    button:{
        url:string , 
        name:string
    }
    qrName:string,
     mp3Url:string,
     imageUrl :string
}