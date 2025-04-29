import React, { useEffect } from "react";
import { useInvoice } from "../context/InvoiceContext";
import Items from "./Items";

function InvoiceForm() {
  const { invoiceData, updateField, updateAddress } = useInvoice();
  
  // Calculate current date and set it automatically
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  useEffect(() => {
    updateField("date", formattedDate);
  }, []);

  // Calculate invoice totals
  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    const discountAmount = subtotal * (invoiceData.discount / 100);
    return subtotal + taxAmount - discountAmount;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Form Section */}
        <section className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold text-gray-500 mb-6">Invoice</h2>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Date and Invoice Number Section */}
            <div className="flex justify-between items-start border-b border-gray-300 pb-5">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <label className="block text-xs font-medium text-gray-700">
                    Current Date:
                  </label>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="block text-xs font-medium text-gray-700">
                    Due Date:
                  </label>
                  <input
                    value={invoiceData.dueDate}
                    onChange={(e) => updateField("dueDate", e.target.value)}
                    type="date"
                    min={formattedDate}
                    className="w-[125px] md:w-[150px] px-2 py-0.5 border border-gray-300 rounded bg-main text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center mb-5 md:mt-0 gap-5">
                <label className="block text-xs font-medium text-gray-700">
                  Invoice #:
                </label>
                <input
                  type="number"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                  className="w-[40px] md:w-[60px] px-2 py-0.5 border border-gray-300 rounded-md bg-main text-sm"
                />
              </div>
            </div>

            {/* Billing Information */}
            <div className="w-full border-b pb-5 border-gray-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
                {/* Bill to */}
                <div className="w-full md:w-1/2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Bill to:
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={invoiceData.from.name}
                      onChange={(e) => updateAddress("from", "name", e.target.value)}
                      placeholder="Client/Company name"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <input
                      type="email"
                      value={invoiceData.from.email}
                      onChange={(e) => updateAddress("from", "email", e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <textarea
                      value={invoiceData.from.add}
                      onChange={(e) => updateAddress("from", "add", e.target.value)}
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Bill from */}
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Bill from:
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={invoiceData.to.name}
                      onChange={(e) => updateAddress("to", "name", e.target.value)}
                      placeholder="Your/Company name"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <input
                      type="email"
                      value={invoiceData.to.email}
                      onChange={(e) => updateAddress("to", "email", e.target.value)}
                      placeholder="your@example.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <textarea
                      value={invoiceData.to.add}
                      onChange={(e) => updateAddress("to", "add", e.target.value)}
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table Section */}
            <Items />

            {/* Invoice Summary */}
            <div className="w-full md:flex justify-end">
              <div className="md:w-[300px] py-6 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">
                  Invoice Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>₹ {calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax:</span>
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoiceData.taxRate}
                        onChange={(e) => updateField("taxRate", e.target.value)}
                        className="w-12 text-right focus:outline-none text-sm bg-transparent"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount:</span>
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoiceData.discount}
                        onChange={(e) => updateField("discount", e.target.value)}
                        className="w-12 text-right focus:outline-none text-sm bg-transparent"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold border-t pt-2 text-lg">
                    <span>Total:</span>
                    <span>₹ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Actions Sidebar */}
        <section className="lg:w-80 space-y-4 mb-10">
          <div className="p-4 cursor-pointer">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 outline-0 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                  clipRule="evenodd"
                />
              </svg>
              Print Invoice
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InvoiceForm;