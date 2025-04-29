import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useInvoice } from "../context/InvoiceContext";

function Items() {
  const { 
    invoiceData, 
    addItem, 
    updateItem, 
    removeItem 
  } = useInvoice();

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[450px] px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Items
              </th>
              <th className="px-1 md:px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                QTY
              </th>
              <th className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="pr-2 md:px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {invoiceData.items.map((item) => (
              <tr key={item.id}>
                <td className="px-1 py-3">
                  <input
                    type="text"
                    value={item.itemname}
                    onChange={(e) => updateItem(item.id, "itemname", e.target.value)}
                    placeholder="Item description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 py-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                    className="w-full text-right px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 py-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, "price", e.target.value)}
                    className="w-full text-right px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 text-center">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer text-white bg-red-500 p-2 rounded hover:bg-red-600 transition-colors"
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-2 text-sm text-white p-2 rounded bg-primary hover:bg-primary-dark font-medium flex items-center justify-center gap-1"
        onClick={addItem}
      >
        <span>+</span> Add Item
      </button>
    </div>
  );
}

export default Items;