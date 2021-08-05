/* Buttons */
export const profileEditBtn = document.querySelector(".profile__edit-btn");
export const addCardBtn = document.querySelector(".profile__add-btn");
export const editAvatarBtn = document.querySelector(".profile__avatar-overlay");

/* Modals */
const editModal = document.querySelector(".modal_type_edit-profile");
const addModal = document.querySelector(".modal_type_add-card");
const editAvatarModal = document.querySelector(".modal_type_update-avatar");

/* Forms */
export const profileForm = editModal.querySelector(".form_type_edit-profile");
export const addForm = addModal.querySelector(".form_type_add-card");
export const editAvatarForm = editAvatarModal.querySelector(".form_type_edit-avatar");

export const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};
