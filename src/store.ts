import { atom, selector } from "recoil";

// LocalStorage API Key
export const IsStorageName = atom({
  key: "IsStorageName",
  default: localStorage.getItem("StudyName"),
});

// // UserList
// export const socketUserList = atom({
//   key: "socketUserList",
//   default: [],
// });

// // room number get, set
// export const userListSet = selector({
//   key: "roomNumberSet",
//   get: ({ get }) => {
//     if (typeof socketUserList === "string") {
//       return get(socketUserList);
//     } else {
//       return;
//     }
//   },
// });

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
