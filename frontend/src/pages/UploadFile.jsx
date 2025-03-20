// import { useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const UploadFile = () => {
//     const [file, setFile] = useState(null);
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleFileChange = (e) => {
//         const uploadedFile = e.target.files[0];
//         if (uploadedFile) {
//             setFile(uploadedFile);
//             parseFile(uploadedFile);
//         }
//     };

//     const parseFile = (file) => {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const binaryStr = event.target.result;
//             const workbook = XLSX.read(binaryStr, { type: "binary" });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const parsedData = XLSX.utils.sheet_to_json(sheet);

//             const formattedContacts = parsedData.map((row) => ({
//                 firstName: row.firstName || row.Name, // Adjust keys if necessary
//                 phone: row.phone || row.Phone,
//                 notes: row.notes || "",
//             }));

//             setContacts(formattedContacts);
//         };

//         reader.readAsBinaryString(file);
//     };

//     const handleUpload = async () => {
//         if (!file || contacts.length === 0) {
//             setMessage("Please select a valid file.");
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         try {
//             const response = await axios.post(
//                 `${BACKEND_URL}/api/uploads`,
//                 { contacts, fileName: file.name },
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             if (response.data.success) {
//                 setMessage("File uploaded successfully!");
//             } else {
//                 setMessage("Upload failed. " + response.data.message);
//             }
//         } catch (error) {
//             setMessage("Error uploading file.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-6">
//             <h2 className="text-2xl font-bold mb-4">Upload Contacts File</h2>

//             <input
//                 type="file"
//                 accept=".csv, .xlsx, .xls"
//                 onChange={handleFileChange}
//                 className="mb-4"
//             />

//             {contacts.length > 0 && (
//                 <p className="mb-2 text-gray-600">Total Contacts: {contacts.length}</p>
//             )}

//             <button
//                 onClick={handleUpload}
//                 disabled={loading || contacts.length === 0}
//                 className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
//             >
//                 {loading ? "Uploading..." : "Upload"}
//             </button>

//             {message && <p className="mt-3 text-red-500">{message}</p>}
//         </div>
//     );
// };

// export default UploadFile;


import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
    Box,
    Typography,
    Button,
    Paper,
    Container,
    Alert,
    CircularProgress,
    createTheme,
    ThemeProvider,
    IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

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

// Styled component for the file input
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            parseFile(uploadedFile);
        }
    };

    const parseFile = (file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            const formattedContacts = parsedData.map((row) => ({
                firstName: row.firstName || row.Name, // Adjust keys if necessary
                phone: row.phone || row.Phone,
                notes: row.notes || "",
            }));

            setContacts(formattedContacts);
        };

        reader.readAsBinaryString(file);
    };

    const handleUpload = async () => {
        if (!file || contacts.length === 0) {
            setMessage("Please select a valid file.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/uploads`,
                { contacts, fileName: file.name },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                setMessage("File uploaded successfully!");
                setMessageType("success");
            } else {
                setMessage("Upload failed. " + response.data.message);
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error uploading file.");
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
                            Upload Contacts File
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                my: 3
                            }}
                        >
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    bgcolor: '#c05e3c',
                                    '&:hover': {
                                        bgcolor: '#a94e33',
                                    },
                                    mb: 2
                                }}
                            >
                                Select File
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".csv, .xlsx, .xls"
                                    onChange={handleFileChange}
                                />
                            </Button>

                            {file && (
                                <Typography variant="body2" color="#333333" sx={{ mb: 1 }}>
                                    Selected: {file.name}
                                </Typography>
                            )}

                            {contacts.length > 0 && (
                                <Typography variant="body1" color="#333333" sx={{ mb: 2 }}>
                                    Total Contacts: {contacts.length}
                                </Typography>
                            )}

                            <Button
                                onClick={handleUpload}
                                disabled={loading || contacts.length === 0}
                                variant="contained"
                                fullWidth
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
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
                            </Button>

                            {message && (
                                <Alert
                                    severity={messageType}
                                    sx={{
                                        mt: 2,
                                        width: '100%'
                                    }}
                                >
                                    {message}
                                </Alert>
                            )}
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default UploadFile;