import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";

const MenuOption = styled(MenuItem)(() => {
  return {
    height: "25px",
    fontSize: "15px",
  };
});

const PointerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const isFloating = router.asPath === '/floatingpointer';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionFloat = () => {
    window.open("/floatingpointer", '_blank', `width=${470},height=${160}`);
    handleClose();
  }

  if (isFloating) { return null; }

  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuOption onClick={handleOptionFloat}>Floating pointer</MenuOption>
      </Menu>
    </>
  );
};

export default PointerMenu;
