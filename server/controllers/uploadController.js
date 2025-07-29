import Upload from "../models/upload.js";
import Task from "../models/task.js";
import Agent from "../models/agent.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    const { fileName, originalName, fileSize, csvData } = req.body;
    const userId = req.user._id;

    // Validation
    if (!fileName || !originalName || !fileSize || !csvData) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (fileName, originalName, fileSize, csvData)"
      });
    }

   
    if (!Array.isArray(csvData) || csvData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "CSV data must be a non-empty array"
      });
    }

    // Validate CSV structure - check if each row has required fields
    const requiredFields = ['firstName', 'phone'];
    const invalidRows = [];
    
    csvData.forEach((row, index) => {
      const missingFields = [];
      
      
      requiredFields.forEach(field => {
        if (!row[field] || row[field].toString().trim() === '') {
          missingFields.push(field);
        }
      });

      if (missingFields.length > 0) {
        invalidRows.push({
          row: index + 1,
          missingFields
        });
      }
    });

    if (invalidRows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "CSV data validation failed",
        errors: invalidRows
      });
    }

    // Get all agents for the user
    const agents = await Agent.find({ userId }).select('_id name email');
    
    if (agents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No agents found. Please create agents first."
      });
    }

    const selectedAgents = agents;


    const upload = new Upload({
      fileName,
      originalName,
      fileSize,
      totalRecords: csvData.length,
      userId,
      uploadStatus: 'processing'
    });

    const savedUpload = await upload.save();

    // Distribute tasks among available agents
    const agentCount = selectedAgents.length;
    const tasksPerAgent = Math.floor(csvData.length / agentCount);
    const remainingTasks = csvData.length % agentCount;
    
    const distributedTasks = [];
    let currentIndex = 0;

    for (let i = 0; i < agentCount; i++) {
      const agentId = selectedAgents[i]._id;
      
    
      let taskCount = tasksPerAgent;
      if (i < remainingTasks) {
        taskCount += 1; 
      }

    
      for (let j = 0; j < taskCount; j++) {
        const rowData = csvData[currentIndex];
        
        const task = {
          firstName: rowData.firstName.toString().trim(),
          phone: rowData.phone.toString().trim(),
          notes: rowData.notes ? rowData.notes.toString().trim() : '',
          agentId,
          userId,
          status: 'pending'
        };

        distributedTasks.push(task);
        currentIndex++;
      }
    }

   
    const createdTasks = await Task.insertMany(distributedTasks);


    await Upload.findByIdAndUpdate(savedUpload._id, {
      uploadStatus: 'completed'
    });

    
    const distributionSummary = selectedAgents.map((agent, index) => {
      let taskCount = tasksPerAgent;
      if (index < remainingTasks) {
        taskCount += 1;
      }
      
      return {
        agentId: agent._id,
        agentName: agent.name,
        agentEmail: agent.email,
        tasksAssigned: taskCount
      };
    });

    res.status(201).json({
      success: true,
      message: "CSV uploaded and tasks distributed successfully",
      data: {
        uploadId: savedUpload._id,
        totalRecords: csvData.length,
        totalTasksCreated: createdTasks.length,
        distributionSummary,
        uploadDetails: {
          fileName: savedUpload.fileName,
          originalName: savedUpload.originalName,
          fileSize: savedUpload.fileSize,
          uploadStatus: 'completed',
          uploadedAt: savedUpload.createdAt
        }
      }
    });

  } catch (error) {
    console.error("Error uploading CSV and distributing tasks:", error);

    
    if (req.body.fileName) {
      try {
        await Upload.findOneAndUpdate(
          { fileName: req.body.fileName, userId: req.user._id },
          { uploadStatus: 'failed' }
        );
      } catch (updateError) {
        console.error("Error updating CSV upload status:", updateError);
      }
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
      message: "Internal server error while processing CSV upload"
    });
  }
};

