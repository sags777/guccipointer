import { Container, styled } from '@mui/material'
import React from 'react'

interface AppContainerProps {
    children: React.ReactNode
}

const PageContainer = styled(Container)(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    }
})

const AppContainer: React.FC<AppContainerProps> = ({children}) => {
  return (
    <PageContainer>
        {children}
    </PageContainer>
  )
}

export default AppContainer