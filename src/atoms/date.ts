import { atom } from "jotai";

export const dateAtom = atom<Date | undefined>(new Date());
