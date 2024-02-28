import React, { createContext, useContext, ReactNode } from "react";
import RootStore from "../RootStore";

interface ProviderProps {
  children: ReactNode;
  store: RootStore;
}

const StoreContext = createContext<RootStore | null>(null);

const StoreProvider: React.FC<ProviderProps> = ({ children, store }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};

export default StoreProvider;
