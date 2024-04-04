import { useStore } from "@/store/StoreProvider/StoreProvider";
import { getSessionInfo } from "@/utilities/commonUtils";
import { useCallback } from "react";
import { usePathValidate } from "./usePathValidate";

export const useOnTabClose = () => {
  const store = useStore();
  const { removeUser } = store.mainStore.getStore();
  const { isFloating } = usePathValidate();

  const removeUserFromSession = useCallback(() => {
    if (isFloating) {
      return;
    }

    const handleTabClose = async () => {
      const roomId = getSessionInfo()?.roomId;
      const userId = getSessionInfo()?.userId;

      if (roomId && userId) {
        try {
          removeUser(roomId, userId);
        } catch (error) {
          throw error;
        }
        sessionStorage.removeItem("pointerSession");
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, [isFloating, removeUser]);

  return removeUserFromSession;
};
