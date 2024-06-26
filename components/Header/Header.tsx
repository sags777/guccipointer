import { Box, Typography, styled } from "@mui/material";
import React from "react";
import Pointer from "../Pointer/Pointer";
import HostMenu from "./HostMenu";
import { usePathValidate } from "@/hooks/usePathValidate";

const HeaderContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    margin: "15px 0",
  };
});

const TitleContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
});

function Header() {
  const { isHomepage } = usePathValidate();

  return (
    <HeaderContainer>
      {isHomepage && (
        <TitleContainer>
          <Typography variant="h4">Gucci Pointer</Typography>
          <HostMenu />
        </TitleContainer>
      )}

      <Pointer />
    </HeaderContainer>
  );
}

export default Header;
