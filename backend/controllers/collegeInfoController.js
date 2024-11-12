const CollegeInfo = require('../models/collegeInfo');

exports.getCollegeInfo = async (req, res) => {
  try {
    const collegeInfo = await CollegeInfo.find();
    res.json(collegeInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
