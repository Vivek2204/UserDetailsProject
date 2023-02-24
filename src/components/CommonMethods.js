import {
  EMAIL_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
  WEBSITE_REGEX,
} from "./Constants";

export const isEmpty = (editUser, formDetails) => {
  for (const element of formDetails) {
    if (editUser[element.labelText.toLowerCase()] === "") {
      return element.labelText + " is a required field";
    }
  }
  return false;
};

export const validateData = (editUser, formDetails) => {
  for (const element of formDetails) {
    let regex = null;
    const key = element.labelText.toLowerCase();
    switch (key) {
      case "name":
        regex = NAME_REGEX;
        break;
      case "email":
        regex = EMAIL_REGEX;
        break;
      case "phone":
        regex = PHONE_REGEX;
        break;
      case "website":
        regex = WEBSITE_REGEX;
        break;
      default:
        break;
    }

    if (editUser[key] !== "" && !regex.test(editUser[key])) {
      return element.labelText + " is not valid";
    }
  }
  return false;
};
