import React, { createContext, useContext, ReactNode } from "react";
import MainStore from "../MainStore";

interface ProviderProps {
  children: ReactNode;
  store: MainStore;
}

const MainStoreContext = createContext<MainStore | null>(null);

const MainStoreProvider: React.FC<ProviderProps> = ({ children, store }) => {
  return <MainStoreContext.Provider value={store}>{children}</MainStoreContext.Provider>;
};

export const useMainStore = (): MainStore => {
  const store = useContext(MainStoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};

export default MainStoreProvider;
