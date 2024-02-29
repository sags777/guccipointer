import React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Typography,
  ListItemIcon,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useStore } from "@/store/StoreProvider/StoreProvider";
import { getSessionInfo } from "@/utilities/commonUtils";
import withStore from "@/store/StoreProvider/withStore";

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
}));

const HostContainer = styled(Box)(() => {
  return {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  };
});

const MenuTitle = styled(Typography)(() => {
  return {
    display: "flex",
    padding: "10px",
    justifyContent: "space-evenly",
  };
});

function HostMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const store = useStore();
  
  const { host, voterData, setHost } = store.mainStore.getStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (userId?: string) => {
    if (userId){
      setHost(userId);
      setAnchorEl(null);
    }
  };

  const sessionInfo = getSessionInfo();
  const isHost = sessionInfo?.userId === host;

  if (!isHost) {
    return null;
  }

  return (
    <React.Fragment>
      <HostContainer>
        <Tooltip title="Host manager">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Chip color="secondary" label="Host" />
          </IconButton>
        </Tooltip>
      </HostContainer>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuTitle>
          <AdminPanelSettingsIcon fontSize="small" />
          Make host
        </MenuTitle>
        <Divider />

        {voterData.length < 2 && <MenuItem disabled>Empty room</MenuItem>}

        {voterData.map((voter, index) => {
          if (voter.userId === sessionInfo.userId) {
            return null;
          }
          return (
            <MenuItem
              onClick={() => handleMenuItemClick(voter.userId)}
              key={index}
            >
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" />
              </ListItemIcon>
              {voter.userName}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </React.Fragment>
  );
}

export default withStore(HostMenu);
