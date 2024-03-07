import { FirebaseActions } from "@/interfaces/FireBaseActions";
import { User } from "@/interfaces/User";
import { makeAutoObservable } from "mobx";

interface GetSignInStore {
    signIn: (user: User) => Promise<string>;
}

class SignInStore {
    private service: FirebaseActions;

    constructor(firebaseActions: FirebaseActions) {
        makeAutoObservable(this);
        this.service = firebaseActions;
    }

    private signIn = (user: User): Promise<string> => {
        return this.service.setUser(user);
    }

    public getStore(): GetSignInStore {
        return {
           signIn: this.signIn,
        };
    }
}

export default SignInStore;