import { Nullable } from "tsdef";
import { User } from "types";
import { create } from "zustand";

type GlobalStore = {
	userData: Nullable<User>;
	setUserData: (data: User | null) => void;
};

const useGlobalStore = create<GlobalStore>()((set) => ({
	userData: null,
	setUserData: (data: User | null) => set(() => ({ userData: data })),
}));

export default useGlobalStore;
