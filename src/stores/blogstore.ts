import { atom, computed, deepMap } from 'nanostores'
import { type BlogPost } from "../utils/types";

export const $posts = deepMap<{ data: BlogPost[] }>({ data: [] });
export const $searchQuery = atom<string>('')
export const $temp = deepMap<{ data: BlogPost[] }>({ data: [] });

export const $loading = atom<boolean>(false);





