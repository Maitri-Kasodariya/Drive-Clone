/**
 * @file App.tsx
 * @description
 * This is the root component of the application.
 * It sets up the layout and displays the title and the Home component.
 */
import { CiHardDrive } from "react-icons/ci";
import Home from './Home';
import '../style/App.css';
import React from 'react';

/**
 * App Component
 * 
 * Renders the top-level UI, including the title section with an icon and
 * the Home component which contains the primary application logic.
 * 
 * @returns JSX.Element
 */
export default function App() {

  return (
    <>
      <div className="title">
        <CiHardDrive className='drive-icon'/>
        <h3>My Drive</h3>
      </div>
      <Home />
    </>  
  );
}

