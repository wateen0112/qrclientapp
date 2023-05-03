export const enum QrController {
  GET_ALL_QR = "Customer/Qr/GetAll",
  GET_MEDIA = "Website/Qr/GetMedia",
  GET_DETAILS = `Customer/Qr/GetById`,
  DELETE_QR = "Customer/Qr/Delete",
  MOVE_FOLDER = "Customer/Qr/MoveToFolder",
  STOPE_QR = "Dashboard/QrDynamic/Deactivate",
  ACTIVE_QR = "Dashboard/QrDynamic/Activate",
  GET_STYLE_QR = "Website/QrDynamic/GetStyle",
  MODIFY_QR = 'Customer/Qr/Modify',
  CANCEL_EDIT = 'Customer/Qr/Cancel'
}
