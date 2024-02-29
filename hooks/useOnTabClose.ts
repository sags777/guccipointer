import { useStore } from "@/store/StoreProvider/StoreProvider";
import { getSessionInfo } from "@/utilities/commonUtils";
import { useCallback } from "react";

export const useOnTabClose = () => {
  const store = useStore();
  const { removeUser } = store.mainStore.getStore();

  const removeUserFromSession = useCallback(() => {
    const handleTabClose = async () => {
      const roomId = getSessionInfo()?.roomId;
      const userId = getSessionInfo()?.userId;

      if (roomId && userId) {
        try {
          await removeUser(roomId, userId);
        } catch (error) {
          console.error("Error removing user on tab close:", error);
        }

        sessionStorage.removeItem("pointerSession");
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, [removeUser]);

  return removeUserFromSession;
};

