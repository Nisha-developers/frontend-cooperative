import { create } from "zustand";
const useWalletStore = create((set, get)=>({
 loans: [],
  loading: false,
  error: null,

  fetchLoans: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}api/loan/`);
      const data = await res.json();

      set({ loans: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));