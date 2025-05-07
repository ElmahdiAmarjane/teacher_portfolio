import React, { useState, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

const PublicationRow = ({ pub, handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const handleUpdatePublication = () => {
    router.visit(route('updatePublications'));
  };

  return (
    <div>hh</div>
  );
};

export default PublicationRow;