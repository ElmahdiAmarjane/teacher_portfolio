import React, { useState, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoCloudDownloadOutline } from "react-icons/io5";


const PublicationRow = ({ pub, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  return (
    <tr key={pub.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center">
          <IoDocumentTextOutline className="mr-2 w-7" />
          {pub.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pub.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pub.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${pub.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {pub.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative text-right" ref={menuRef}>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <BsThreeDotsVertical className="w-5 h-5 text-gray-600 hover:text-black" />
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <button
              onClick={() => {
                alert(`Update ${pub.title}`);
                setOpenMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              <div className='flex items-center'>
              <RxUpdate  className='mr-3'/>
              Update
              </div>
            </button>
            <button
              onClick={() => {
                alert(`Download ${pub.title}`);
                setOpenMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              <div className='flex items-center'>
              <IoCloudDownloadOutline  className='mr-3'/>
              Download
              </div>
            </button>
            <button
              onClick={() => {
                handleDelete(pub.id);
                setOpenMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              <div className='flex items-center'>
              <MdOutlineDeleteForever className='mr-3'/>
              Delete
              </div>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PublicationRow;