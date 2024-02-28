import { makeAutoObservable } from "mobx";
import SignInStore from "./SignInStore";
import MainStore from "./MainStore";
import { firebaseActions } from "./service/firebaseService";

class RootStore {
  mainStore: MainStore;
  signInStore: SignInStore;
  
  constructor() {
    makeAutoObservable(this);
    this.mainStore = new MainStore(firebaseActions);
    this.signInStore = new SignInStore(firebaseActions);
  }
}

export default RootStore;
