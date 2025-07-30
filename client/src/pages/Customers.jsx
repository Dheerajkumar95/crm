import React, { useState } from 'react';
import { FaPlus, FaFileImport } from 'react-icons/fa';
import { motion } from 'framer-motion';

const initialData = [
  {
    id: 1,
    company: 'efeferf',
    contact: '',
    email: '',
    phone: '54323454323',
    active: false,
    groups: '',
    created: '2025-07-18 12:28:35',
  },
  {
    id: 2,
    company: 'algo nx',
    contact: '',
    email: '',
    phone: '',
    active: true,
    groups: '',
    created: '2025-07-19 11:44:57',
  },
  {
    id: 3,
    company: 'Test',
    contact: 'Demo Test',
    email: 'Client@mingrow.com',
    phone: '',
    active: false,
    groups: '',
    created: '2025-07-21 19:17:21',
  },
  {
    id: 4,
    company: 'Test assam',
    contact: 'Test Assam',
    email: 'sssjahidul7861@gmail.com',
    phone: '',
    active: true,
    groups: '',
    created: '2025-07-21 23:42:43',
  },
  {
    id: 5,
    company: 'Wayen Industries',
    contact: 'View | [Contacts] | Delete',
    email: '',
    phone: '123456789',
    active: false,
    groups: '',
    created: '2025-07-22 11:41:41',
  },
  {
    id: 6,
    company: 'fggg',
    contact: 'jhgfd hgfc',
    email: 'x@xmail.com',
    phone: '',
    active: true,
    groups: '',
    created: '2025-07-23 11:15:52',
  },
  {
    id: 7,
    company: 'DTech Industries',
    contact: 'View | [Contacts] | Delete',
    email: '',
    phone: '1234567847',
    active: false,
    groups: '',
    created: '2024-06-12 14:41:41',
  },
  {
    id: 8,
    company: 'Wayen Industries',
    contact: 'View | [Contacts] | Delete',
    email: '',
    phone: '123456789',
    active: false,
    groups: 'Tech Group',
    created: '2025-07-22 11:41:41',
  },
  {
    id: 9,
    company: 'Wayen Industries',
    contact: 'View | [Contacts] | Delete',
    email: '',
    phone: '123456789',
    active: false,
    groups: '',
    created: '2025-07-22 11:41:41',
  },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialData);

  const handleToggle = (id) => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === id ? { ...cust, active: !cust.active } : cust
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-transform hover:translate-x-1">
          Contacts <span className="text-lg">→</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {[
            {
              count: 24,
              label: 'Total Customers',
              color: 'text-gray-900',
            },
            {
              count: customers.filter((c) => c.active).length,
              label: 'Active Customers',
              color: 'text-green-600',
            },
            {
              count: customers.filter((c) => !c.active).length,
              label: 'Inactive Customers',
              color: 'text-red-500',
            },
            {
              count: 11,
              label: 'Active Contacts',
              color: 'text-blue-600',
            },
            {
              count: 0,
              label: 'Inactive Contacts',
              color: 'text-gray-500',
            },
            {
              count: 2,
              label: 'Contacts Logged',
              color: 'text-purple-600',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-2 rounded-lg shadow h-8 flex items-center"
            >
              <p className={`${stat.color} font-semibold text-sm`}>
                <span className="text-gray-900">{stat.count}</span> {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-0.5 rounded h-8 transition-colors"
        >
          <FaPlus className="text-xs" />
          New Customer
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border border-gray-300 px-4 py-0.5 rounded h-8 transition-colors"
        >
          <FaFileImport className="text-xs" />
          Import Customers
        </motion.button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Company', 'Primary Contact', 'Primary Email', 'Phone', 'Active', 'Groups', 'Date Created'].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <motion.div
                      className={`w-12 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                        customer.active ? 'bg-green-400' : 'bg-gray-300'
                      }`}
                      onClick={() => handleToggle(customer.id)}
                      initial={false}
                      animate={{
                        backgroundColor: customer.active ? '#4ade80' : '#d1d5db',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full shadow-md"
                        layout
                        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                        animate={{
                          x: customer.active ? 24 : 0,
                        }}
                      />
                    </motion.div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.groups}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.created}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;