import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atom({ nickname: "", jwt: "" });
// Create your atoms and derivatives
export const textAtom = atom("hello");
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

// Set the string key and the initial value
export const userLocalAtom = atomWithStorage("user", {
  nickname: "",
  accessToken: "",
});
