import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function Items() {
  const [items, setItems] = useState([1, 2]);

  const handleAddItem = () => {
    setItems([...items, items.length + 1]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

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
                QYT
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
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-1 py-3">
                  <input
                    type="text"
                    placeholder="Item description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 py-3">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full text-right px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 py-3">
                  <input
                    type="number"
                    min="0"
                    step="1.00"
                    defaultValue="1.00"
                    className="w-full text-right px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-gray-50"
                  />
                </td>
                <td className="px-1 text-center">
                  <button 
                    onClick={() => handleRemoveItem(index)}
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
        onClick={handleAddItem}
      >
        <span>+</span> Add Item
      </button>
    </div>
  );
}

export default Items;