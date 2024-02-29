import { useSignInUser } from "@/hooks/useSignInUser";
import withStore from "@/store/StoreProvider/withStore";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Alert,
} from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePathValidate } from "@/hooks/usePathValidate";

const SignInContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    maxWidth: "200px",
    border: "1px solid grey",
    padding: "15px 15px",
    borderRadius: "10px",
    gap: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  };
});

const WelcomeTitle = styled(Alert)(() => ({
  margin: "20px auto",
  width: "200px",
  fontSize: "25px",
  justifyContent: "inherit",
  height: "35px",
  alignItems: "center",
}));

const VoterNameInput = styled(TextField)(() => ({
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    display: "flex",
    lineHeight: 1.8,
    gap: '5px'
  },
}));

function UserSignIn() {
  const [voterName, setVoterName] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setVoterName(name);
  };

  const { isSignin } = usePathValidate();

  const buttonText = isSignin ? "Create Room" : "Enter Room";
  const signInUser = useSignInUser();

  const handleSignIn = () => {
    if (!voterName) {
      setError(true);
      return;
    }
    signInUser(voterName);
  };

  return (
    <>
      <WelcomeTitle color="success" icon>
        Gucci Pointer
      </WelcomeTitle>
      <SignInContainer>
        <Typography variant="h6">Enter voter name</Typography>
        <VoterNameInput
          error={error}
          helperText={
            error && (
              <>
                <ErrorOutlineIcon fontSize="small" />
                Please, enter a name
              </>
            )
          }
          onChange={handleInputChange}
          size="small"
          variant="outlined"
        ></VoterNameInput>
        <Button onClick={handleSignIn} variant="contained">
          {buttonText}
        </Button>
      </SignInContainer>
    </>
  );
}

export default withStore(UserSignIn);
