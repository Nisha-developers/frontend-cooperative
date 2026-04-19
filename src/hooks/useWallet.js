import {create} from 'zustand';
import { useAuth } from '../context/AuthContext';

const useWalletStore = create((set, get) => ({
  transactions: [],
  loading: false,
  open: false,
  message: '',
  title: '',
  error: '',
  returnMessage: '',
  transactionHistory: [],
  showMessage: (payload) => {
set({
  message: payload.message,
  title: payload.title,
  error: payload.error,
  open: payload.open
})
  },
    closeMessage: () => set({ open: false }),
  

  // GET transactions
  getTransactions: async (token) => {
    set({ loading: true });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/full`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       get().showMessage(
          {
            message: 'There is an error check and try again',
            title: 'Fetch transaction Error',
            error: 'error',
            open: true
          }
        )
        throw new Error('An error has occurred, check and try again' )
      }
     
     

      set({
        transactions: data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      get().showMessage(
         {
            message: 'There is an error check and try again',
            title: 'Fetch transaction Error',
            error: 'error',
            open: true
          }
      )
      set({ loading: false });
    }
  },
 getTransactionsHistory: async (token) => {
    set({ loading: true });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/transactions/history/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       set({returnMessage: 'notOkay'})
        throw new Error('An error has occurred, check and try again' )
      }
      console.log(data)
      set({
       transactionHistory: data,
        loading: false,
      });
    } catch (error) {
       set({returnMessage: 'catchError'})
      console.log(error);
      set({ loading: false });
    }
  },

  // FUND wallet
  fundWallet: async (payload, token) => {
    set({ loading: true });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wallet/credit/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
     console.log(data);
     if(!res.ok){
       get().showMessage(
          {
            message: 'There is an error while making the transactions. Please Check and try again',
            title: 'Transaction Error',
            error: 'Error',
            open: true
          }
        )
        return
     }
 get().showMessage(
          {
            message: 'Your transaction is pending wait for approval for payment completion',
            title: 'Pending Transaction',
            error: 'success',
            open: true
          }
        )
      set({ loading: false });
    } catch (error) {
       get().showMessage(
          {
            message: 'There is an error while making the transactions. Please Check and try again',
            title: 'Transaction Error',
            error: 'Error',
            open: true
          }
        )
      console.log(error);
      set({ loading: false });
    }
  },
  withdraw: async(payload, token) => {
     set({ loading: true });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wallet/debit/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log(data);
      console.log(res)
      if(!res.ok){
        get().showMessage(
          {
            message: 'There is an error while making the transactions. Please Check and try again',
            title: 'Debit Transaction Error',
            error: 'Error',
            open: true
          }
        )
        return;
      }
      console.log(data);
 get().showMessage(
          {
            message: 'Your debit transaction is pending wait for approval for payment completion',
            title: 'Pending debit Transaction',
            error: 'success',
            open: true
          }
        )
      set({ loading: false });
    } catch (error) {
       get().showMessage(
          {
            message: 'There is an error while making the transactions. Please Check and try again',
            title: 'Debit Transaction Error',
            error: 'Error',
            open: true
          }
        )
      console.log(error);
      set({ loading: false });
    }
  }
}));


export default useWalletStore;