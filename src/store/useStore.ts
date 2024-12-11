// src/store/useStore.ts
import { create } from "zustand";

interface StoreState {
	searchQuery: string;
	categoryFilter: string;
	sortBy: string;
	isGridView: boolean; // New state to track the current view
	setSearchQuery: (query: string) => void;
	setCategoryFilter: (category: string) => void;
	setSortBy: (sort: string) => void;
	setIsGridView: (isGrid: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
	searchQuery: "",
	categoryFilter: "",
	sortBy: "",
	isGridView: true,
	setSearchQuery: (query) =>
		set({
			searchQuery: query,
			isGridView: true, // Automatically switch to grid view when searching
		}),
	setCategoryFilter: (category) => set({ categoryFilter: category }),
	setSortBy: (sort) => set({ sortBy: sort }),
	setIsGridView: (isGrid) => set({ isGridView: isGrid }),
}));

export default useStore;
