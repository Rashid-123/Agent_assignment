// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const Dashboard = () => {
//     const [agents, setAgents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAgents = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Assuming authentication
//                 const response = await axios.get(`${BACKEND_URL}/api/agents`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.data.success) {
//                     setAgents(response.data.data);
//                 } else {
//                     setError("Failed to fetch agents.");
//                 }
//             } catch (err) {
//                 setError(err.response?.data?.message || "Error fetching agents.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAgents();
//     }, []);

//     if (loading) return <p className="text-center mt-5">Loading...</p>;
//     if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Agents Dashboard</h2>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left border-b">Name</th>
//                             <th className="p-3 text-left border-b">Email</th>
//                             <th className="p-3 text-left border-b">Mobile</th>
//                             <th className="p-3 text-left border-b">Tasks</th>
//                             <th className="p-3 text-left border-b">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {agents.map((agent) => (
//                             <tr key={agent._id} className="hover:bg-gray-50">
//                                 <td className="p-3 border-b">{agent.name}</td>
//                                 <td className="p-3 border-b">{agent.email}</td>
//                                 <td className="p-3 border-b">{agent.mobile}</td>
//                                 <td className="p-3 border-b">{agent.tasks.length}</td>
//                                 <td className="p-3 border-b">
//                                     <button
//                                         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                                         onClick={() => navigate(`/agent/${agent._id}`)}
//                                     >
//                                         View Details
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Container,
    Box,
    Chip,
    CircularProgress,
    Alert,
    ThemeProvider,
    createTheme
} from "@mui/material";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create custom theme with the provided color palette
const theme = createTheme({
    palette: {
        primary: {
            main: "#c05e3c",
        },
        secondary: {
            main: "#f8f0ed",
        },
        text: {
            primary: "#333333",
        },
        success: {
            main: "#4caf50",
        },
        warning: {
            main: "#ff9800",
        },
        divider: "#e0e0e0",
        background: {
            default: "#ffffff",
            paper: "#f8f0ed",
        },
    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f8f0ed",
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: "#f8f0ed",
                        transition: "background-color 0.2s",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: "none",
                    fontWeight: 500,
                },
            },
        },
    },
});

const Dashboard = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming authentication
                const response = await axios.get(`${BACKEND_URL}/api/agents`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setAgents(response.data.data);
                } else {
                    setError("Failed to fetch agents.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching agents.");
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={3} display="flex" justifyContent="center">
                <Alert severity="warning" sx={{ width: "100%", maxWidth: "600px" }}>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" color="primary" gutterBottom>
                    Agents Dashboard
                </Typography>

                <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 2, borderRadius: 2, overflow: "hidden" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Tasks</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agents.map((agent) => (
                                <TableRow key={agent._id}>
                                    <TableCell>{agent.name}</TableCell>
                                    <TableCell>{agent.email}</TableCell>
                                    <TableCell>{agent.mobile}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={agent.tasks.length}
                                            color={agent.tasks.length > 0 ? "success" : "warning"}
                                            size="small"
                                            sx={{ minWidth: "32px" }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/agent/${agent._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default Dashboard;