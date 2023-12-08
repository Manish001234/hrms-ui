import React, { createContext, useContext, useState } from 'react';

const LeaveContext = createContext();

export function useLeaveContext() {
  return useContext(LeaveContext);
}

export function LeaveProvider({ children }) {
  const [leave, setLeave] = useState([]);
  const [actionPerformed, setActionPerformed] = useState(false);

  const value = {
    leave,
    setLeave,
    actionPerformed,
    setActionPerformed,
  };

  return <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>;
}