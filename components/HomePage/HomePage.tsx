import { checkPointerSessionTokenExists } from '@/utilities/commonUtils'
import React from 'react'
import UserSignIn from '../UserSignIn/UserSignIn'
import Header from '../Header/Header'
import VotingTable from '../VotingTable/VotingTable'
import dynamic from 'next/dynamic'
import Result from '../Result/Result'
import { useOnTabClose } from '@/hooks/useOnTabClose'

function HomePage() {
  const setupTabCloseListener = useOnTabClose();

  React.useEffect(() => {
    const cleanupTabCloseListener = setupTabCloseListener();

    return cleanupTabCloseListener;
  }, [setupTabCloseListener]);
  
  return (
    <>
        {!checkPointerSessionTokenExists() ? (
            <UserSignIn />
          ) : (
            <>
              <Header />
              <Result />
              <VotingTable />
            </>
          )}
    </>
  )
}

export default dynamic(() => Promise.resolve(HomePage), {
    ssr: false,
  });
  