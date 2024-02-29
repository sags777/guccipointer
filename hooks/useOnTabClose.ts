import { useStore } from "@/store/StoreProvider/StoreProvider";
import { checkPointerSessionTokenExists, getSessionInfo } from "@/utilities/commonUtils";
import { useEffect } from "react";

export const useOnTabClose = () => {
  const store = useStore();
  const { removeUser } = store.mainStore.getStore();

  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      const roomId = getSessionInfo()?.roomId;
      const userId = getSessionInfo()?.userId;
      
      if (roomId && userId) {
        removeUser(roomId, userId);
        sessionStorage.removeItem("pointerSession");
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [removeUser]);
};
