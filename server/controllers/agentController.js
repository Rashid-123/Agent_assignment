import bcrypt from "bcryptjs";
import Agent from "../models/agent.js";
import Task from "../models/task.js";

/// ------------------------- Add agents -----------------
 export const addAgent = async (req, res) => {
    try {
        const { name, email, mobileNumber, password } = req.body;
        const userId = req.user._id;


        if (!name || !email || !mobileNumber || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if agent already exists for this user with same email
        const existingAgent = await Agent.findOne({ userId, email });
        if (existingAgent) {
            return res.status(400).json({
                success: false,
                message: "Agent with this email already exists for your account"
            });
        }


        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }


        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobileNumber.replace(/\s+/g, ''))) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit mobile number"
            });
        }


        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new agent
        const newAgent = new Agent({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            mobileNumber: mobileNumber.trim(),
            password: hashedPassword,
            userId
        });


        const savedAgent = await newAgent.save();


        const agentResponse = {
            _id: savedAgent._id,
            name: savedAgent.name,
            email: savedAgent.email,
            mobileNumber: savedAgent.mobileNumber,
            userId: savedAgent.userId,
            createdAt: savedAgent.createdAt,
            updatedAt: savedAgent.updatedAt
        };

        res.status(201).json({
            success: true,
            message: "Agent created successfully",
            data: agentResponse
        });

    } catch (error) {
        console.error("Error creating agent:", error);


        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Agent with this email already exists for your account"
            });
        }


        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ------------------------- get all agents for user -----------------

export const getAllAgents = async (req, res) => {
    try {
        const userId = req.user._id;


        const agents = await Agent.find({ userId }).select('-password');


        const agentsWithTaskCount = await Promise.all(
            agents.map(async (agent) => {
                const taskCount = await Task.countDocuments({ agentId: agent._id });
                return {
                    ...agent.toObject(),
                    taskCount,
                };
            })
        );

        res.status(200).json({
            success: true,
            data: agentsWithTaskCount,
        });
    } catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//-------------------------- Get single agent by ID -----------------
export const getSingleAgent = async (req, res) => {
    try {
        const agentId = req.params.id;
        const userId = req.user._id;

        const agent = await Agent.findById(agentId)
            .lean()
            .select('name email mobileNumber');

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        const tasks = await Task.find({ agentId })
            .sort({ createdAt: -1 })
            .lean();


        res.status(200).json({
            success: true,
            data: { ...agent, tasks }
        });
    } catch (error) {
        console.error("Error fetching agent:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


