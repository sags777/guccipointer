import AppContainer from "@/components/Container/Container";
import HomePage from "@/components/HomePage/HomePage";
import RootStore from "@/store/RootStore";
import StoreProvider from "@/store/StoreProvider/StoreProvider";
import React from "react";

const store = new RootStore();

function Home() {
  return (
      <StoreProvider store={store}>
        <AppContainer>
             <HomePage />
        </AppContainer>
      </StoreProvider>
  );
}

export default Home;
