const Contact = require('../models/Contact');

// --------------------------------------- Get all contacts ----------------------------------
//         GET /api/contacts
//         Private
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .populate({
        path: 'assignedTo',
        select: 'name email'
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------- Get contacts by agent-----------------------
//        GET /api/contacts/agent/:agentId
//        Private
exports.getContactsByAgent = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ assignedTo: req.params.agentId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------- Update contact -----------------
//         PUT /api/contacts/:id
//         Private
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

//----------------------------------- Delete contact -----------------------------
//          DELETE /api/contacts/:id
//          Private
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    await contact.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};