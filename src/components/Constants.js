export const ICON_SIZE = '18px'
export const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
// export const PHONE_REGEX = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
export const PHONE_REGEX = /^[0-9-+()x ]*$/
export const WEBSITE_REGEX =
  // eslint-disable-next-line max-len
  /[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
export const NAME_REGEX = /^[a-zA-Z ]{0,30}$/
export const DELETE = 'Delete'
export const CANCEL = 'Cancel'
export const OK = 'Ok'
export const DELETE_HEADER = 'Delete User'
export const DELETE_MODEL_TEXT = 'Are you sure you want to delete the user?'
export const EDIT_HEADER = 'Edit User Details'
export const UPDATE_SUCCESS = 'User is updated successfully'
export const DELETE_SUCCESS = 'User is deleted successfully'
