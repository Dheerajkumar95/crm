import React, { useState } from 'react';
import { ChevronDown, CalendarDays, Plus, Trash2, Check } from 'lucide-react';

// Item Row Component for the dynamic list
const ItemRow = ({ item, index, updateItem, removeItem }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateItem(index, { ...item, [name]: value });
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-start py-3 border-b border-gray-200 last:border-b-0">
      {/* Item */}
      <div className="col-span-12 sm:col-span-2">
        <input
          type="text"
          name="item"
          value={item.item}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          placeholder="Item"
        />
      </div>
 
      <div className="col-span-12 sm:col-span-3">
        <textarea
          name="description"
          value={item.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  resize-y min-h-[40px]"
          placeholder="Long description"
          rows="1" // Start with 1 row, let it expand
        ></textarea>
      </div>

      {/* Qty */}
      <div className="col-span-6 sm:col-span-1">
        <input
          type="number"
          name="qty"
          value={item.qty}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          placeholder="0"
        />
      </div>

      {/* Rate - Adjusted from col-span-3 to col-span-2 */}
      <div className="col-span-6 sm:col-span-2">
        <input
          type="number"
          name="rate"
          value={item.rate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
          placeholder="0.00"
        />
      </div>

      {/* Tax */}
      <div className="col-span-6 sm:col-span-2 relative">
        <select
          name="tax"
          value={item.tax}
          onChange={handleInputChange}
          className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
        >
          <option>No Tax</option>
          <option>GST (5%)</option>
          <option>VAT (20%)</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>

      {/* Amount and Delete */}
      <div className="col-span-6 sm:col-span-2 flex items-center space-x-2">
        <input
          type="text"
          name="amount"
          value={item.amount}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
        />
        <button
          onClick={() => removeItem(index)}
          className="p-2 rounded-md hover:bg-red-100 text-red-600 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Main App Component
const NewProposal= () => {
  const [subject, setSubject] = useState('');
  const [related, setRelated] = useState('');
  const [date, setDate] = useState('');
  const [openTill, setOpenTill] = useState('');
  const [currency, setCurrency] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [tags, setTags] = useState('');
  const [allowComments, setAllowComments] = useState(false);
  const [status, setStatus] = useState('Draft');
  const [assigned, setAssigned] = useState('Super Admin');
  const [to, setTo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Nothing selected');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [quantityAs, setQuantityAs] = useState('Qty'); // 'Qty' or 'Hours'
  const [items, setItems] = useState([
    {
      item: '',
      description: '',
      qty: 0,
      rate: 0,
      tax: 'No Tax',
      amount: '$0.00',
    },
  ]);

  const [discountValue, setDiscountValue] = useState(0);
  const [adjustmentValue, setAdjustmentValue] = useState(0);

  const updateItem = (index, newItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        item: '',
        description: '',
        qty: 0,
        rate: 0,
        tax: 'No Tax',
        amount: '$0.00',
      },
    ]);
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  // Calculate totals (simplified for this example)
  const subTotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const total = subTotal - discountValue + adjustmentValue;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter antialiased">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">New Proposal</h1>
      </div>

      {/* Main Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                <span className='text-red-500'>* </span> Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
              />
            </div>

            <div>
              <label htmlFor="related" className="block text-sm font-medium text-gray-700 mb-1">
               <span className='text-red-500'>* </span>Related
              </label>
              <div className="relative">
                <select
                  id="related"
                  value={related}
                  onChange={(e) => setRelated(e.target.value)}
                  className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8 text-gray-500"
                >
                  <option>Nothing selected</option>
                  {/* Add more options here */}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className='text-red-500'>* </span>Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-1"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="open-till" className="block text-sm font-medium text-gray-700 mb-1">
                  Open Till
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="open-till"
                    value={openTill}
                    onChange={(e) => setOpenTill(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className='text-red-500'>* </span>Currency
                </label>
                <div className="relative">
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
                  >
                   <option>INR ₹</option>
                    <option>USD $</option>
                    <option>EUR €</option>
                    <option>GBP £</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="discount-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
                </label>
                <div className="relative">
                  <select
                    id="discount-type"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8 text-gray-500"
                  >
                    <option>No discount</option>
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                placeholder="Tag"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Allow Comments</span>
              <button
                onClick={() => setAllowComments(!allowComments)}
                className={`relative inline-flex w-10 h-5 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none   focus:ring-offset-2 ${
                  allowComments ? 'bg-green-400' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={allowComments}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    allowComments ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
                  >
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Accepted</option>
                    <option>Declined</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="assigned" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned
                </label>
                <div className="relative">
                  <select
                    id="assigned"
                    value={assigned}
                    onChange={(e) => setAssigned(e.target.value)}
                    className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
                  >
                    <option>Super Admin</option>
                    <option>User 1</option>
                    <option>User 2</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                <span className='text-red-500'>* </span>To
              </label>
              <input
                type="text"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  resize-y min-h-[80px]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="relative">
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
                  >
                    <option>Nothing selected</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>Canada</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip-code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className='text-red-500'>* </span>Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className='text-red-500'>* </span>Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <select
                className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  pr-8"
              >
                <option>Add Item</option>
                <option>Add Service</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button
              onClick={addItem}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
              aria-label="Add new item"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Show quantity as:</span>
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="quantity-as"
                  value="Qty"
                  checked={quantityAs === 'Qty'}
                  onChange={() => setQuantityAs('Qty')}
                  className="form-radio h-4 w-4 text-green-600 border-gray-300 "
                />
                <span className="ml-2 text-gray-700">Qty</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="quantity-as"
                  value="Hours"
                  checked={quantityAs === 'Hours'}
                  onChange={() => setQuantityAs('Hours')}
                  className="form-radio h-4 w-4 text-green-600 border-gray-300 "
                />
                <span className="ml-2 text-gray-700">Hours</span>
              </label>
            </div>
          </div>
        </div>

        {/* Item List Header - Updated col-span values to match ItemRow */}
        <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
          <div className="col-span-2">Item</div>
          <div className="col-span-3">Description</div> {/* Adjusted */}
          <div className="col-span-1">Qty</div>
          <div className="col-span-2">Rate</div> {/* Adjusted */}
          <div className="col-span-2">Tax</div>
          <div className="col-span-2">Amount</div>
        </div>

        {/* Item Rows */}
        {items.map((item, index) => (
          <ItemRow
            key={index} // Using index as key for simplicity, unique IDs would be better in a real app
            item={item}
            index={index}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}

        {/* Totals Summary */}
        <div className="flex justify-end mt-6">
          <div className="w-full sm:w-1/2 lg:w-1/3 space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>Sub Total:</span>
              <span className="font-semibold">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>Discount:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1 border border-gray-300 rounded-md text-right  "
                />
                <div className="relative">
                  <select className="appearance-none p-1 border border-gray-300 rounded-md pr-6  ">
                    <option>%</option>
                    <option>$</option>
                  </select>
                  <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span>Adjustment:</span>
              <input
                type="number"
                value={adjustmentValue}
                onChange={(e) => setAdjustmentValue(parseFloat(e.target.value) || 0)}
                className="w-20 p-1 border border-gray-300 rounded-md text-right  "
              />
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-800 border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
