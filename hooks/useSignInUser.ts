import { User } from "@/interfaces/User";
import { useStore } from "@/store/StoreProvider/StoreProvider";
import { useRouter } from "next/router";

export const useSignInUser = () => {
  const store = useStore();
  const { signIn } = store.signInStore.getStore();

  const router = useRouter();
  const { id } = router.query;

  const signInUser = async (voterName: string) => {
    const user: User = {
      userName: voterName,
      roomId: id?.toString(),
    };

    try {
      const roomId = await signIn(user);
      router.push(`/rooms/${roomId}`);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return signInUser;
};
