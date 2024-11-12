const mongoose = require('mongoose');

const collegeInfoSchema = new mongoose.Schema({
  name: String,
  location: String,
  about: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String,
  },
  admission: {
    process: String,
    eligibility: String,
    importantDates: String,
    fees: String,
  },
  academics: {
    coursesOffered: [String],
    departments: [String],
    facultyInfo: String,
  },
  facilities: {
    library: String,
    sports: String,
    hostels: String,
    labs: String,
    infrastructure: String, // New Field: Infrastructure details
  },
  events: {
    cultural: String,
    technical: String,
    sportsFest: String,
  },
  placement: {
    statistics: String,
    topRecruiters: [String],
  },
  faq: [
    {
      question: String,
      answer: String,
    }
  ],
  socialProfiles: { // New Field: Social media links
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
  },
  accreditation: { // New Field: Accreditation and Ranking
    accreditationBody: String,
    ranking: String,
  },
  scholarships: [String], // New Field: Scholarships offered by the college
  facultyContacts: [ // New Field: Contact info for individual faculties
    {
      name: String,
      department: String,
      phone: String,
      email: String,
    }
  ]
});

module.exports = mongoose.model('CollegeInfo', collegeInfoSchema);
