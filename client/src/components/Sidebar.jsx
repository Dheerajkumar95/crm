import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser, FaBolt, FaClipboard, FaFileAlt, FaTasks, FaLifeRing,
  FaChartBar, FaCogs, FaFileContract, FaWallet, FaProjectDiagram,
  FaUsersCog, FaQuestionCircle, FaWhatsapp, FaWrench, FaChartLine,
  FaCalendarCheck, FaHistory, FaPhone, FaUserCog, FaWpforms
} from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div
      className={`bg-[#060000] text-white h-full transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex flex-col h-full px-4 py-6">
        {/* Profile */}
        <div className="mb-8 border-b border-amber-50 pb-2">
          <div className="flex items-center space-x-3">
            <img src="/crm.png" alt="Logo" className="w-12 h-10 rounded-full object-cover" />
            <div>
              <div className="font-semibold">Super Admin</div>
              <div className="text-sm text-gray-400">contact@shivanshitech.com</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto hide-scrollbar">
          <MenuItem icon={<FaClipboard />} label="Dashboard" to="/" />
          <MenuItem icon={<FaBolt />} label="Sales" expandable open={openMenu === 'Sales'} onClick={() => toggleMenu('Sales')} />
          {openMenu === 'Sales' && (
            <SubMenu items={[
              {label:'Leads', to:'/leads'},
              {label:'Account', to:'/account'},
              { label: 'Contact', to: '/contact' },
              { label: 'Opportunities', to: '/opportunitieslist' },
              { label: 'Proposals', to: '/proposal' },
              { label: 'Contract', to: '/estimates' },
              { label: 'Invoices' },
              { label: 'Payments' },
              { label: 'Credit Notes' },
            ]} />
          )}

          <MenuItem label="Meeting & Event" expandable open={openMenu === 'appointly'} onClick={() => toggleMenu('appointly')} />
          {openMenu === 'appointly' && (
            <SubMenu
              items={[
                { label: 'Appointments', icon: <FaCalendarCheck /> },
                { label: 'Past Meetings', icon: <FaHistory /> },
                { label: 'Callbacks', icon: <FaPhone /> },
                { label: 'Own Settings', icon: <FaUserCog /> },
                { label: 'Form Info', icon: <FaWpforms /> }
              ]}
            />
          )}

          <MenuItem icon={<FaFileAlt />} label="Subscriptions" />
          <MenuItem icon={<FaWallet />} label="Expenses" />
          <MenuItem icon={<FaWhatsapp />} label="WhatsBot" expandable open={openMenu === 'whatsbot'} onClick={() => toggleMenu('whatsbot')} />
          <MenuItem icon={<FaFileContract />} label="Contracts" />
          <MenuItem icon={<FaProjectDiagram />} label="Product" to="/productlist" />
          <MenuItem icon={<FaUsersCog />} label="HR Payroll" expandable open={openMenu === 'payroll'} onClick={() => toggleMenu('payroll')} />
          <MenuItem icon={<FaTasks />} label="Tasks" />
          <MenuItem icon={<FaLifeRing />} label="Support" to="/cases"/>
          <MenuItem icon={<FaFileAlt />} label="Estimate Request" />
          <MenuItem icon={<FaQuestionCircle />} label="Knowledge Base" />

          <MenuItem icon={<FaWrench />} label="Utilities" expandable open={openMenu === 'utilities'} onClick={() => toggleMenu('utilities')} />
          {openMenu === 'utilities' && (
            <SubMenu items={['Subitem 1', 'Subitem 2']} />
          )}

          <MenuItem icon={<FaChartLine />} label="Reports" expandable open={openMenu === 'reports'} onClick={() => toggleMenu('reports')} />
          {openMenu === 'reports' && (
            <SubMenu items={['Subitem 1', 'Subitem 2']} />
          )}

          <MenuItem icon={<FaCogs />} label="Setup" />
        </nav>
      </div>
    </div>
  );
};

// 🔧 MenuItem component with routing support
const MenuItem = ({ icon, label, to, active = false, expandable = false, open = false, onClick }) => {
  const content = (
    <div
      onClick={expandable ? onClick : undefined}
      className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
        active ? 'bg-[#33acff] text-black' : 'hover:bg-[#1e1e1e]'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span>{label}</span>
      {expandable && <span className="ml-auto">{open ? '-' : '+'}</span>}
    </div>
  );

  return <div>{to ? <Link to={to}>{content}</Link> : content}</div>;
};


const SubMenu = ({ items }) => (
  <div className="ml-6 text-sm text-gray-300 space-y-1 py-1">
    {items.map((item, index) => {
      if (typeof item === 'object') {
        return item.to ? (
          <Link
            key={index}
            to={item.to}
            className="flex items-center gap-2 hover:text-white"
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        ) : (
          <div key={index} className="flex items-center gap-2 hover:text-white cursor-pointer">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        );
      }
      return (
        <div key={index} className="hover:text-white cursor-pointer">
          {item}
        </div>
      );
    })}
  </div>
);


export default Sidebar;
