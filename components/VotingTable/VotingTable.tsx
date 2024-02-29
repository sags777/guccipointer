import { useStore } from '@/store/StoreProvider/StoreProvider'
import withStore from '@/store/StoreProvider/withStore'
import { Poll } from '@mui/icons-material'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { getSessionInfo } from '@/utilities/commonUtils'
import { User } from '@/interfaces/User'
import { usePathValidate } from '@/hooks/usePathValidate'

const VotingTableContainer = styled(Box)(() => {
    return {
        display: 'flex',
        maxWidth: "380px",
        marginTop: '20px',
        width: '100%'
    }
})

const TableTitle = styled(TableCell)(() => {
    return {
        fontSize: "20px"
    }
})

const BodyRow = styled(TableRow)(() => {
    return {
        padding: 0
    }
})

const VoterName = styled(TableCell)(() => {
    return {
        width: '80%',
    }
})

const VoterPoint = styled(TableCell)(() => {
    return {
        width: '20%',
        textAlign: 'center',
    }
})

function VotingTable() {

  const store = useStore();
  const { host, votesHidden, voterData, getData } =  store.mainStore.getStore();

  React.useEffect(() => {
    getData();
  }, [getData]);

  function displayVoterPoints(voter: User) {
    const sessionInfo = getSessionInfo();
    const points = voter.points;
    const isCurrentUser = voter.userName === sessionInfo?.userName;
    const isHost = sessionInfo?.userId === host;
  
    const renderVoterPoint = (content: ReactNode) => (
      <VoterPoint size='small' align='right'>
        {content}
      </VoterPoint>
    );
  
    if (points !== '') {
      if (!votesHidden || isCurrentUser) {
        if (isHost && votesHidden) {
          return renderVoterPoint(<CheckIcon fontSize='large'/>);
        }
        return renderVoterPoint(points);
      } else if (votesHidden) {
        return renderVoterPoint(<CheckIcon fontSize='large'/>);
      }
    }
  
    return renderVoterPoint(<Poll fontSize='large'/>);
  }
  
  const { isFloating } = usePathValidate();

  if (isFloating || !votesHidden) { return null; }

  return (
    <VotingTableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableTitle>Voters</TableTitle>
                    <TableTitle align='right'>Points</TableTitle>
                </TableRow>
            </TableHead>
            <TableBody>
                {voterData.map((voter, index) => {
                    return (
                    <BodyRow key={index}>
                        <VoterName size='small'>{voter.userName}</VoterName>
                        {displayVoterPoints(voter)}
                    </BodyRow>
                    )
                })}
            </TableBody>
        </Table>
    </VotingTableContainer>
  )
}

export default withStore(VotingTable);