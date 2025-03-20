// import { useState } from "react";
// import axios from "axios";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const countryCodes = [
//     { code: "+1", country: "USA" },
//     { code: "+91", country: "India" },
//     { code: "+44", country: "UK" },
//     { code: "+61", country: "Australia" },
//     { code: "+81", country: "Japan" }
// ];

// const AddAgent = () => {
//     const [agent, setAgent] = useState({
//         name: "",
//         email: "",
//         countryCode: "+1",
//         mobile: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setAgent({ ...agent, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!agent.name || !agent.email || !agent.mobile || !agent.password) {
//             setMessage("All fields are required.");
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         try {
//             const token = localStorage.getItem("token"); // Assuming user is authenticated
//             const response = await axios.post(
//                 `${BACKEND_URL}/api/agents/`,
//                 {
//                     ...agent,
//                     mobile: agent.countryCode + agent.mobile // Combine country code with mobile
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 setMessage("Agent added successfully!");
//                 setAgent({ name: "", email: "", countryCode: "+1", mobile: "", password: "" });
//             } else {
//                 setMessage(response.data.message || "Failed to add agent.");
//             }
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Error adding agent.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-6">
//             <h2 className="text-2xl font-bold mb-4">Add New Agent</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
//                 <input type="text" name="name" placeholder="Agent Name" value={agent.name} onChange={handleChange} className="p-2 border rounded" />
//                 <input type="email" name="email" placeholder="Agent Email" value={agent.email} onChange={handleChange} className="p-2 border rounded" />

//                 <div className="flex gap-2">
//                     <select name="countryCode" value={agent.countryCode} onChange={handleChange} className="p-2 border rounded">
//                         {countryCodes.map(({ code, country }) => (
//                             <option key={code} value={code}>{`${country} (${code})`}</option>
//                         ))}
//                     </select>
//                     <input type="text" name="mobile" placeholder="Mobile Number" value={agent.mobile} onChange={handleChange} className="p-2 border rounded flex-1" />
//                 </div>

//                 <input type="password" name="password" placeholder="Password" value={agent.password} onChange={handleChange} className="p-2 border rounded" />

//                 <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400">
//                     {loading ? "Adding..." : "Add Agent"}
//                 </button>
//             </form>
//             {message && <p className="mt-3 text-red-500">{message}</p>}
//         </div>
//     );
// };

// export default AddAgent;


import { useState } from "react";
import axios from "axios";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    CircularProgress,
    Box,
    Alert,
    createTheme,
    ThemeProvider
} from "@mui/material";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Custom theme based on the color usage plan
const theme = createTheme({
    palette: {
        primary: {
            main: '#c05e3c',
        },
        secondary: {
            main: '#f8f0ed',
        },
        text: {
            primary: '#333333',
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ff9800',
        },
        background: {
            default: '#ffffff',
            paper: '#f8f0ed',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#c05e3c',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#c05e3c',
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#333333',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c05e3c',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c05e3c',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 4,
                    textTransform: 'none',
                },
            },
        },
    },
});

const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
];

const AddAgent = () => {
    const [agent, setAgent] = useState({
        name: "",
        email: "",
        countryCode: "+1",
        mobile: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");

    const handleChange = (e) => {
        setAgent({ ...agent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!agent.name || !agent.email || !agent.mobile || !agent.password) {
            setMessage("All fields are required.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BACKEND_URL}/api/agents/`,
                { ...agent, mobile: agent.countryCode + agent.mobile },
                { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setMessage("Agent added successfully!");
                setMessageType("success");
                setAgent({ name: "", email: "", countryCode: "+1", mobile: "", password: "" });
            } else {
                setMessage(response.data.message || "Failed to add agent.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error adding agent.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: '#ffffff',
                    py: 4
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={2}
                        sx={{
                            p: 4,
                            borderRadius: 2,
                            bgcolor: '#f8f0ed',
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            align="center"
                            gutterBottom
                            fontWeight="bold"
                            color="#333333"
                        >
                            Add New Agent
                        </Typography>

                        {message && (
                            <Alert
                                severity={messageType}
                                sx={{ mb: 3 }}
                            >
                                {message}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <TextField
                                label="Agent Name"
                                name="name"
                                value={agent.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: 1,
                                }}
                            />

                            <TextField
                                label="Agent Email"
                                name="email"
                                type="email"
                                value={agent.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: 1,
                                }}
                            />

                            <FormControl
                                fullWidth
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: 1,
                                }}
                            >
                                <InputLabel>Country Code</InputLabel>
                                <Select
                                    name="countryCode"
                                    value={agent.countryCode}
                                    onChange={handleChange}
                                    label="Country Code"
                                >
                                    {countryCodes.map(({ code, country }) => (
                                        <MenuItem key={code} value={code}>
                                            {`${country} (${code})`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Mobile Number"
                                name="mobile"
                                value={agent.mobile}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: 1,
                                }}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={agent.password}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    bgcolor: '#ffffff',
                                    borderRadius: 1,
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    bgcolor: '#c05e3c',
                                    '&:hover': {
                                        bgcolor: '#a94e33',
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: '#e0e0e0',
                                        color: '#999999'
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Add Agent"}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default AddAgent;