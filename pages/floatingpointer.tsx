import Pointer from '@/components/Pointer/Pointer'
import { Box, styled } from '@mui/material'
import React from 'react'

const FloatingPointerContainer = styled(Box)(() => {
  return {
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0
  }
})

function floatingpointer() {
  return (
    <FloatingPointerContainer>
        <Pointer />
    </FloatingPointerContainer>
  )
}

export default floatingpointer