import { Button, ButtonProps, styled } from '@mui/material'
import React from 'react'

interface PointButtonProps extends ButtonProps{
    children: string;
}

const Point = styled(Button)(() => {
    return {
        margin: '5px 5px',
        height: '30px',
    }
})

const PointButton: React.FC<PointButtonProps> = ({children, ...props}) => {

  return (
    <Point variant='contained' {...props}>
        {children}
    </Point>
  )
}

export default PointButton