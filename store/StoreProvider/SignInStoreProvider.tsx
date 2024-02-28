import React, { createContext, useContext, ReactNode } from "react";
import RootStore from "../RootStore";
import SignInStore from "../SignInStore";

interface ProviderProps {
  children: ReactNode;
  store: SignInStore;
}

const SignInStoreContext = createContext<SignInStore | null>(null);

const SignInStoreProvider: React.FC<ProviderProps> = ({ children, store }) => {
  return <SignInStoreContext.Provider value={store}>{children}</SignInStoreContext.Provider>;
};

export const useStore = (): SignInStore => {
  const store = useContext(SignInStoreContext);
  if (!store) {
    throw new Error("useStore must be used within a SignInStoreProvider");
  }
  return store;
};

export default SignInStoreProvider;
