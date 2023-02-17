import { atom, selector } from "recoil";

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

// room number default
const roomNumberState = atom({
  key: "roomNumber",
  default: "",
});

// room number get, set
export const roomNumberSet = selector({
  key: "roomNumberSet",
  get: ({ get }) => {
    return get(roomNumberState);
  },
  set: ({ set }, newValue) => {
    const number = set(roomNumberState, newValue);
    if (typeof newValue === "number") {
      return number;
    } else {
      return;
    }
  },
});
