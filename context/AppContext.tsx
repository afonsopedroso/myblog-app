"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
const [selectedTag, setSelectedTag] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ selectedTag, setSelectedTag }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);