import { atom, useAtom } from 'jotai';

export const userDataAtom = atom({})

export function useUserDataAtom(){
  return useAtom(userDataAtom)
}