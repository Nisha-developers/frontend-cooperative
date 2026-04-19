import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/`);
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.log(err);
    }
  };

  const viewDetails = useCallback(async (id) => {  // ✅ stable reference
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}/`);
      if (!res.ok) throw new Error("Failed to fetch listing details");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, []); // ✅ never recreated

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SaleContext.Provider value={{ sales, setSales, fetchSales, viewDetails }}>
      {children}
    </SaleContext.Provider>
  );
};

export const useSale = () => useContext(SaleContext);