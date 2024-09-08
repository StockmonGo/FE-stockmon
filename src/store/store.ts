import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atom({ nickname: "", jwt: "" });
// Create your atoms and derivatives
export const textAtom = atom("hello");
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());
export const buffetAtom = atom({ maxLat: 0, minLat: 0, maxLon: 0, minLon: 0 });

// Set the string key and the initial value
export const userLocalAtom = atomWithStorage("user", "");
export const accessTokenAtom = atomWithStorage("accessToken", "");

export const stockmonGameAtom = atom({ id: -1, stockmonId: -1 });
