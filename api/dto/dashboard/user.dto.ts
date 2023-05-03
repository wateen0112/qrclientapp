export class User {
    id: string;
    email: string;
    dateCreated: string;
    name: string;
    cityId?: any;
    countryId?: any;
    phoneNumber?: any;
    company?: any;
    street?: any;
    website?: any;
    industryId: string;
}
export class PasswordDto {
    currentPassword = '';
    newPassword = '';
    confirmNewPassword = '';
}