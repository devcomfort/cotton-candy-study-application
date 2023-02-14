import { atom } from "recoil";

// LocalStorage API Key
export const IsStorageName = atom({
  key: "IsStorageName",
  default: localStorage.getItem("StudyName"),
});

// InviteModal Active
export const activeModal = atom({
  key: "activeModal",
  default: false,
});

// InviteNumber
export const inviteNumber = atom({
  key: "inviteNumber",
  default: 0,
});

// check invite inputNumber
export const inputAlert = atom({
  key: "inputAlert",
  default: "",
});

// check number length
export const isNumberCheck = atom({
  key: "isNumberCheck",
  default: false,
});
