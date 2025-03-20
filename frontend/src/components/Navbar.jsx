
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
        handleMenuClose();
    };

    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#c05e3c", top: "4px", left: "4px", right: "4px", width: "calc(100% - 8px)", }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                {/* Logo / Title */}
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                    Agent Management
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    {user ? (
                        <>
                            <NavButton to="/add_agent" label="Add Agent" isActive={isActive("/add_agent")} />
                            <NavButton to="/upload_task" label="Upload Tasks" isActive={isActive("/upload_task")} />
                            <NavButton to="/dashboard" label="Dashboard" isActive={isActive("/dashboard")} />
                            <Button onClick={handleLogout} sx={{ ...navButtonStyle, backgroundColor: "#ff4d4d" }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavButton to="/login" label="Login" isActive={isActive("/login")} />
                            <NavButton to="/register" label="Register" isActive={isActive("/register")} />
                        </>
                    )}
                </Box>

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{ "& .MuiPaper-root": { backgroundColor: "#f8f0ed" } }}
                    >
                        {user ? (
                            <>
                                <MobileMenuItem to="/add_agent" label="Add Agent" isActive={isActive("/add_agent")} />
                                <MobileMenuItem to="/upload_task" label="Upload Tasks" isActive={isActive("/upload_task")} />
                                <MobileMenuItem to="/dashboard" label="Dashboard" isActive={isActive("/dashboard")} />
                                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>Logout</MenuItem>
                            </>
                        ) : (
                            <>
                                <MobileMenuItem to="/login" label="Login" isActive={isActive("/login")} />
                                <MobileMenuItem to="/register" label="Register" isActive={isActive("/register")} />
                            </>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// ✅ Desktop Navbar Buttons
const NavButton = ({ to, label, isActive }) => (
    <Button
        component={Link}
        to={to}
        sx={{
            ...navButtonStyle,
            backgroundColor: isActive ? "#b55234" : "transparent",
        }}
    >
        {label}
    </Button>
);


const MobileMenuItem = ({ to, label, isActive }) => (
    <MenuItem
        component={Link}
        to={to}
        sx={{ backgroundColor: isActive ? "#dbc4bd" : "transparent" }}
    >
        {label}
    </MenuItem>
);

// ✅ Button Styling
const navButtonStyle = {
    color: "white",
    "&:hover": { backgroundColor: "#b55234" },
};

export default Navbar;
