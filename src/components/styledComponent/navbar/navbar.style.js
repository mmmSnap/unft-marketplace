import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import { useRouter } from "next/router";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingIcon from "@mui/icons-material/Settings";
import AccountIcon from "@mui/icons-material/AccountBoxRounded";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import logo from "../../public/logo.jpg";
import { styled } from "@mui/system";
import { useSession, signOut, signIn } from "next-auth/react";

const MainDiv = styled("div")({
  flexGrow: 1,
});
const StyledAppBar = styled(AppBar)({
  borderBottom: "0.5px solid gray !important",
  boxShadow: "none !important",
  backgroundColor: "#1887BE",
});
const GreyColor = grey[800];
const StyledNavBox = styled(Box)({
  flexGrow: 1,
  textAlign: "center",
  color: GreyColor,
});

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const TabList = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#" },
  {
    label: "Contact Us",
    href: "#",
  },
  // { label: "Profile", href: "/photographer/profile" },
];

const StyledNavbarComponent = () => {
  function CustomMenuItem({ icon, label, onClick }) {
    return (
      <MenuItem onClick={onClick}>
        <Avatar>{icon}</Avatar>
        {label}
      </MenuItem>
    );
  }
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log("handleClose", event);
    setAnchorEl(null);
  };

  const { data: session } = useSession();

  return (
    <MainDiv>
      <StyledAppBar>
        <Toolbar>
          <Image
            src={logo}
            alt="Picture of the author"
            width={89}
            height={60}
          />
          <StyledNavBox>
            <Tabs
              indicatorColor={"secondary"}
              centered
              textColor="secondary"
              value={index}
              onChange={(_, ind) => setIndex(ind)}
            >
              {TabList.map((items) => (
                <Link href={items.href}>
                  <Tab label={items.label} />
                </Link>
              ))}
            </Tabs>
          </StyledNavBox>
          <Avatar sx={{ width: 32, height: 32 }}>
            <NotificationsIcon />
          </Avatar>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={session != null ? session?.user?.image : ""}
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 12,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {session && (
              <>
                <CustomMenuItem onClick={() =>
                    router.push("/photographer/profile")
                  } icon={null} label={"Profile"} /> 
                <CustomMenuItem icon={<AccountIcon />} label={"My account"} />
                <Divider />
                <CustomMenuItem icon={<SettingIcon />} label={"Settings"} />

                <CustomMenuItem
                  onClick={() =>
                    router.push(`/mybooking/${session.user.email}`)
                  }
                  icon={<EventAvailableRoundedIcon color="primary" />}
                  label={"My Booking"}
                />

                <Divider />
              </>
            )}
            {session !== null ? (
              <CustomMenuItem
                icon={<Logout />}
                label={"Logout"}
                onClick={() => signOut({ callbackUrl: "/" })}
              />
            ) : (
              <CustomMenuItem
                icon={<Login />}
                label={"Login"}
                onClick={() =>
                  signIn({
                    callbackUrl: "/",
                  })
                }
              />
            )}
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </MainDiv>
  );
};
export default StyledNavbarComponent;
