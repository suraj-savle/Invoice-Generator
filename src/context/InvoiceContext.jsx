import { createContext, useContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    from: { name: "", email: "", add: "" },
    to: { name: "", email: "", add: "" },
    invoiceNumber: "",
    date: "",
    dueDate: "",
    items: [{ id: 1, itemname: "", quantity: 1, price: 1 }],
    taxRate: 0,
    discount: 0,
  });

  const updateField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const updateAddress = (type, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), itemname: "", quantity: 1, price: 1 }
      ]
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  return (
    <InvoiceContext.Provider value={{
      invoiceData,
      updateField,
      updateAddress,
      addItem,
      updateItem,
      removeItem
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};