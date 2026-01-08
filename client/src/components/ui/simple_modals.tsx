// src/components/Simple_Modal.tsx
import React from "react";

/*
3 parts to an overlay

part 1) 
The idea is this component act as the overlay 
- So this overlay will only be rendered if the switch is ON (isOpen = true)
- It will have a button inside it that will call the onClose function to turn the switch OFF

part 2.1)
The page will have the switch state (isOpen) and the function to turn it OFF (onClose) with useState
- it will have a div with an onClick

part 2.2)
The page will also have a div, with the onClick that will turn on and off the swtich 
- it will also have 
*/

interface Simple_Modal_Props_Interface {
  isOpen: boolean;
  onClose: () => void; // This is the function to flip the state back to false
}

const Simple_Modal: React.FC<Simple_Modal_Props_Interface> = ({
  isOpen,
  onClose,
}) => {
  // If isOpen is false, the code below this line never runs
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Study Overlay</h2>
        <p>This is a manual test of the overlay system.</p>

        {/* The X Button */}
        <button
          onClick={onClose}
          style={{ backgroundColor: "red", color: "white", padding: "10px" }}
        >
          X - Close Me
        </button>
      </div>
    </div>
  );
};

export default Simple_Modal;

/* 
Use this code 



// src/pages/activity/all.tsx
import React, { useState } from 'react';
import SimpleModal from '../../components/SimpleModal';

const ActivityPage = () => {
  // 1. Define the "Light Switch" state. Default is 'false' (closed).
  const [showStudyModal, setShowStudyModal] = useState(false);

  return (
    <div className="dashboard-container">
      <h1>Activity Page</h1>

       2. The Button that turns the switch ON 
      <button 
        onClick={() => setShowStudyModal(true)}
        style={{ padding: '20px', backgroundColor: '#4a77e5', color: 'white' }}
      >
        Click to Pop Out Overlay
      </button>

       3. Place the Modal component here. 
          We pass the current state (showStudyModal) 
          and the function to turn it OFF (setShowStudyModal) 
      <SimpleModal 
        isOpen={showStudyModal} 
        onClose={() => setShowStudyModal(false)} 
      />
    </div>
  );
};



*/
