import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#f8f0ed",
                color: "#333333",
                textAlign: "center",
                padding: "7px 0",  // Increased padding for more height
                borderTop: "2px solidrgb(210, 192, 192)",
                marginTop: "auto",
                minHeight: "60px",  // Ensures the footer is taller
                display: "flex",
                alignItems: "center", // Centers text vertically
                justifyContent: "center", // Centers text horizontally
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Agent Management. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
