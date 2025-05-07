/**
 * @file Content.tsx
 * @description
 * This component renders the content inside a folder ("My Drive"):
 * - Displays files and folders
 * - Enables right-click context menu with Rename/Delete options
 * - Provides modal for creating or renaming items
 * - Uses context to access and update current folder and visible data
 */
import { FcFolder, FcFile } from "react-icons/fc";
import { IoMdAddCircleOutline } from "react-icons/io";
import '../style/Content.css';
import React, { useState, useContext, useEffect } from 'react';
import CreateUpdateItem from './CreateUpdateDialogBox';
import { currContext, dataCurrContext } from "../Context";
import { fetchData, deleteItem } from '../Utils';


export default function Content() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'Create' | 'Rename'>('Create');
  const [contextObjectId, setContextObjectId] = useState<string>('');
  const currContextVal = useContext(currContext);
  const dataCurrContextVal = useContext(dataCurrContext);

  /**
   * Handle right-click on a folder/file item
   * - Shows the custom context menu at the mouse position
   * - Sets the ID of the item being interacted with
   */
  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setShowMenu(true);
    setContextObjectId(id);
  };

  /**
   * Hide context menu when clicking outside
   */
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Opens the Create modal
  const createModal = () => {
    setOpenModal(true);
    setModalType("Create");
  };

  // Opens the Rename modal for the item from the context menu
  const renameModal = () => {
    setOpenModal(true);
    setModalType("Rename");
  }

  // Deletes the selected item and refreshes the current folder's data
  const delItem = () => {
    deleteItem(contextObjectId);
    fetchData(currContextVal.curr, dataCurrContextVal.setDataCurr);
  }

  return (
    <div className="content">
      {
        dataCurrContextVal.dataCurr.map(ele => {
          return (
            <div className="item" key={ele.id}  >
              <div onContextMenu={(e) => handleContextMenu(e, ele.id)}>
                {ele.type === "folder" && <button className="itemBtn" onClick={() => { currContextVal.setCurr(ele.id) }}> <FcFolder className='itemIcon' /> </button>}
                {ele.type === "file" && <FcFile className='itemIcon' />}
              </div>
              <p className="content_items" >{ele.name}</p>
            </div>
          )
        })
      }
      <button className='create' onClick={createModal}>
        <IoMdAddCircleOutline className='addIcon' />
      </button>
      {
        openModal && <CreateUpdateItem modalType={modalType} contextObjectId={contextObjectId} setOpenModal={setOpenModal} />
      }
      {
        showMenu && (
          <ul className="contextMenu" style={{ top: menuPosition.y, left: menuPosition.x }}>
            <li className="menuItem" onClick={renameModal}>Rename</li>
            <li className="menuItem" onClick={delItem} >Delete</li>
          </ul>
        )
      }
    </div>
  );
}