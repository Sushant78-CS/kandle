import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesStore {
  favorites: FavoriteProduct[];

  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (id: string) => void;
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      // Add
      addToFavorites: (product) => {
        set((state) => {
          const exists = state.favorites.some((item) => item.id === product.id);

          if (exists) {
            return state;
          }

          return {
            favorites: [...state.favorites, product],
          };
        });
      },

      // Remove
      removeFromFavorites: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },

      // Add / Remove
      toggleFavorite: (product) => {
        const exists = get().favorites.some((item) => item.id === product.id);

        if (exists) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      // Check
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id);
      },

      // Clear
      clearFavorites: () => {
        set({
          favorites: [],
        });
      },
    }),

    {
      name: "kandle-favorites",
    },
  ),
);
