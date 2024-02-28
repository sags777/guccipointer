import { useSignInUser } from '@/hooks/useSignInUser'
import withStore from '@/store/StoreProvider/withStore'
import { Box, TextField, Typography, Button, styled } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const SignInContainer = styled(Box)(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '200px',
        border: '1px solid grey',
        padding: '15px 15px',
        borderRadius: '10px',
        gap: '10px',
        marginTop: '50px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }
})

function UserSignIn() {

  const [voterName, setVoterName] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoterName(event.target.value);
  };

  const router = useRouter();
  const signInPath = router.asPath === '/' || router.asPath === '/rooms';

  const buttonText = signInPath ? 'Create Room' : 'Enter Room';
  const signInUser = useSignInUser();

  const handleSignIn = () => {
    signInUser(voterName);
  };

  return (
    <SignInContainer>
        <Typography variant='h6'>Enter voter name</Typography>
        <TextField onChange={handleInputChange} size='small' variant='outlined'></TextField>
        <Button onClick={handleSignIn} variant="contained">{buttonText}</Button>
    </SignInContainer>
  )
}

export default withStore(UserSignIn);