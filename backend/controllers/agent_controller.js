const Agent = require('../models/Agent');
const User = require("../models/User")
// --------------------------------- Create new agent ---------------------------------------
// @route   POST /api/agents
// @access  Private
exports.createAgent = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Ensure createdBy field is set from the authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    req.body.createdBy = req.user._id; // Assign the user ID to createdBy

    // Validate input fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, mobile, and password'
      });
    }

    // Check if an agent with the same email exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: 'An agent with this email already exists'
      });
    }

    // Check if an agent with the same mobile number exists
    const existingMobile = await Agent.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: 'An agent with this mobile number already exists'
      });
    }

    // Create and save the agent
    const agent = await Agent.create({
      name,
      email,
      mobile,
      password,
      createdBy: req.user._id // Store the logged-in user's ID
    });

    // Add agent ID to the user's agents array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { agents: agent._id } }, // Push the new agent ID into the agents array
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        createdBy: agent.createdBy // Include createdBy in response
      }
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------- Get all agents ---------------------------------
// @route   GET /api/agents
// @access  Private
exports.getAgents = async (req, res, next) => {
  try {
    // Find agents created by the logged-in user
    const agents = await Agent.find({ createdBy: req.user.id }).select('-password');


    if (!agents || agents.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No agents found for this user.'
      });
    }

    res.status(200).json({
      success: true,
      data: agents
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ----------------------------------  Get single agent ------------------------
// @route   GET /api/agents/:id
// @access  Private
exports.getAgentById = async (req, res, next) => {
  try {
    // Find the agent by ID, exclude password, and populate tasks with contact details
    const agent = await Agent.findById(req.params.id)
      .select('-password')
      .populate('tasks'); // Populate the tasks field with contact details

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    res.status(200).json({
      success: true,
      data: agent
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------------ Update agent ---------------------------------
// @route   PUT /api/agents/:id
// @access  Private
exports.updateAgent = async (req, res, next) => {
  try {
    // Remove password from update if it exists
    if (req.body.password) {
      delete req.body.password;
    }

    const agent = await Agent.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    res.status(200).json({
      success: true,
      data: agent
    });
  } catch (err) {
    next(err);
  }
};

// --------------------------------    Delete agent ----------------------------------------------
// @route   DELETE /api/agents/:id
// @access  Private
exports.deleteAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    await agent.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};



// Getagents response 
// {
//   "success": true,
//   "data": [
//       {
//           "_id": "67db3bfb5059da5535f0e11f",
//           "name": "Rajesh Kumar",
//           "email": "rajesh.kumar@example.com",
//           "mobile": "+91 98765-43210",
//           "createdBy": "67db3afd5059da5535f0e119",
//           "tasks": [
//               "67db3e0e5059da5535f0e136",
//               "67db3e0e5059da5535f0e137",
//               "67db3e0e5059da5535f0e138"
//           ],
//           "createdAt": "2025-03-19T21:49:47.442Z",
//           "__v": 0
//       },
//       {
//           "_id": "67db3c0f5059da5535f0e125",
//           "name": "Carlos Mendes",
//           "email": "carlos.mendes@example.com",
//           "mobile": "+55 21-99876-5432",
//           "createdBy": "67db3afd5059da5535f0e119",
//           "tasks": [
//               "67db3e0e5059da5535f0e139",
//               "67db3e0e5059da5535f0e13a",
//               "67db3e0e5059da5535f0e13b"
//           ],
//           "createdAt": "2025-03-19T21:50:07.752Z",
//           "__v": 0
//       },
//       {
//           "_id": "67db3c3d5059da5535f0e12b",
//           "name": "Muhammad Ali",
//           "email": "muhammad.ali@example.com",
//           "mobile": "+92 321-9876543",
//           "createdBy": "67db3afd5059da5535f0e119",
//           "tasks": [
//               "67db3e0e5059da5535f0e13c",
//               "67db3e0e5059da5535f0e13d"
//           ],
//           "createdAt": "2025-03-19T21:50:53.990Z",
//           "__v": 0
//       },
//       {
//           "_id": "67db3c635059da5535f0e131",
//           "name": "Priya Singh",
//           "email": "priya.singh@example.com",
//           "mobile": "+91 8765432109",
//           "createdBy": "67db3afd5059da5535f0e119",
//           "tasks": [
//               "67db3e0e5059da5535f0e13e",
//               "67db3e0e5059da5535f0e13f"
//           ],
//           "createdAt": "2025-03-19T21:51:31.539Z",
//           "__v": 0
//       }
//   ]
// }




// GET agents by id response 
// {
//   "success": true,
//   "data": {
//       "_id": "67db3c635059da5535f0e131",
//       "name": "Priya Singh",
//       "email": "priya.singh@example.com",
//       "mobile": "+91 8765432109",
//       "createdBy": "67db3afd5059da5535f0e119",
//       "tasks": [
//           {
//               "_id": "67db3e0e5059da5535f0e13e",
//               "firstName": "Suresh Iyer",
//               "phone": "+91 9567890123",
//               "notes": "Looking for business loan details",
//               "assignedTo": "67db3c635059da5535f0e131",
//               "uploadedBy": "67db3afd5059da5535f0e119",
//               "batchId": "c9a261f1-a1f3-429c-9848-bc8d1b551f74",
//               "createdAt": "2025-03-19T21:58:38.398Z",
//               "__v": 0
//           },
//           {
//               "_id": "67db3e0e5059da5535f0e13f",
//               "firstName": "Ramesh Yadav",
//               "phone": "+91 9678901234",
//               "notes": "Inquired about personal loan",
//               "assignedTo": "67db3c635059da5535f0e131",
//               "uploadedBy": "67db3afd5059da5535f0e119",
//               "batchId": "c9a261f1-a1f3-429c-9848-bc8d1b551f74",
//               "createdAt": "2025-03-19T21:58:38.398Z",
//               "__v": 0
//           }
//       ],
//       "createdAt": "2025-03-19T21:51:31.539Z",
//       "__v": 0
//   }
// }