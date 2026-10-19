const Contact = require('../models/Contact');

// Submit new inquiry
const submitInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, interest, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields.' 
      });
    }

    const inquiry = await Contact.create({
      fullName,
      email,
      phone,
      interest: interest || 'Perfumes',
      message,
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully!', 
      data: inquiry 
    });
  } catch (error) {
    console.error('Submit Inquiry Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error occurred.' 
    });
  }
};

// Fetch all inquiries for Admin
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ 
      success: true, 
      count: inquiries.length, 
      data: inquiries 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete an inquiry
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Inquiry not found' 
      });
    }
    return res.status(200).json({ 
      success: true, 
      message: 'Inquiry removed successfully' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = { submitInquiry, getInquiries, deleteInquiry };