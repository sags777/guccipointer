import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { usePathValidate } from "@/hooks/usePathValidate";

const MenuOption = styled(MenuItem)(() => {
  return {
    height: "25px",
    fontSize: "15px",
  };
});

const PointerMenuButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const PointerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { isFloating } = usePathValidate();

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
      <PointerMenuButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </PointerMenuButton>

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
