import { FirebaseActions } from "@/interfaces/FireBaseActions";
import { User } from "@/interfaces/User";
import { makeAutoObservable } from "mobx";

interface GetSignInStore {
    signIn: (user: User) => Promise<string>;
}

class SignInStore {
    service: FirebaseActions;

    constructor(firebaseActions: FirebaseActions) {
        makeAutoObservable(this);
        this.service = firebaseActions;
    }

    signIn = (user: User): Promise<string> => {
        return this.service.setUser(user);
    }

    getStore(): GetSignInStore {
        return {
           signIn: this.signIn,
        };
    }

}

export default SignInStore;