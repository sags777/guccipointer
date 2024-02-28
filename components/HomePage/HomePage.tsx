import { checkPointerSessionTokenExists } from '@/utilities/commonUtils'
import React from 'react'
import UserSignIn from '../UserSignIn/UserSignIn'
import Header from '../Header/Header'
import VotingTable from '../VotingTable/VotingTable'
import dynamic from 'next/dynamic'
import Result from '../Result/Result'

function HomePage() {
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
  