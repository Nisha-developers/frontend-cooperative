import { create } from "zustand";
import { useAuth } from "../context/AuthContext";

const useLoan = create((set, get)=>({
  
 loans: {},
 detailedLoan: {},
  loading: false,
  error: null,
  message: '',
  title: '',
  open: false,
  type: '',
  success: false,
   showMessage: (payload) => {
set({
  message: payload.message,
  title: payload.title,
  type: payload.type,
  open: payload.open
})
  },
    closeMessage: () => set({ open: false }),
fetchLoans: async (token, uid = '', refreshAccessToken) => {
  set({ loading: true, error: null });
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/loan/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
       if(res.status === 401){
        refreshAccessToken();
      }
      throw new Error("An error has occurred, check and try again");
    }

    const data = await res.json();
    console.log(data);
if(uid){
  set({ detailedLoan: {data}, loading: true });
  return data;
}
    set({ loans: data, loading: false, success: true });

  } catch (err) {
    console.log(err);
    set({ error: err.message, loading: false, success: false });
  }
},
applyLoan: async (token, payload, refreshAccessToken) => {
  set({ loading: true, error: null, success:false });

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/loan/apply/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
const data = await res.json();
    if (!res.ok) {
       if(res.status === 401){
        refreshAccessToken();
      }
      set({success: false})
      get().showMessage(
          {
            message: data[Object.keys(data)[0]],
            title: 'Apply Error',
            type: 'error',
            open: true
          }
      )
      console.log(data);
      throw new Error(text || "Failed to apply for loan");
    }

    
    console.log(" Loan applied:", data);

    set({ loading: false, success: true, loans:data });
     get().showMessage(
          {
            message: 'Your loan application is successful. You will be credited before two working days',
            title: 'Application successful',
            error: 'success',
            open: true
          }
      )

  } catch (err) {
    console.log(" ERROR:", err);
    set({ error: err.message, loading: false, success:false });
  }
},
previewLoan: async (token, payload, refreshAccessToken) => {
  set({ loading: true, error: null });

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/loan/preview/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
const data = await res.json();
    if (!res.ok) {
       if(res.status === 401){
        refreshAccessToken();
      }
      get().showMessage(
          {
            message: data[Object.keys(data)[0]],
            title: 'Apply Error',
           type: 'error',
            open: true
          }
      )
      console.log(data);
      set({success: false})
      throw new Error(text || "Failed to apply for loan");
    }

    
    console.log(" Loan applied:", data);

    set({ loading: false, success: true });
    return data

  } catch (err) {
    console.log(" ERROR:", err);
    set({ error: err.message, loading: false, success:true });
  }
},
  repayLoan: async (token, loanUid, refreshAccessToken) => {
    set({ loading: true, error: null });
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/loan/${loanUid}/repay/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
      });
      
      const data = await res.json();
      
      if (!res.ok) {
         if(res.status === 401){
        refreshAccessToken();
      }
        const errorMessage = data.message || data.error || "Repayment failed";
        get().showMessage({
          message: errorMessage,
          title: 'Repayment Failed',
          type: 'error',
          open: true
        });
        set({ success: false, loading: false });
        return;
      }
      
      console.log("Repayment successful:", data);
       set((state) => ({
    loans: {
      ...state.loans,
      active_loan: data.loan
    }
  }));
      get().showMessage({
        open: true,
        message: data.message || "Payment successful! Your loan has been updated.",
        title: 'Payment Success',
        type: 'success',
        
      });
      
    } catch (err) {
      console.log("Repayment error:", err);
      get().showMessage({
        message: err.message || "Network error. Please try again.",
        title: 'Error',
        type: 'error',
        open: true
      });
      set({ error: err.message, loading: false, success: false });
    }
  },
}));
export default useLoan;