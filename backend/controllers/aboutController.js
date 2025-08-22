// const About = require("../models/About");

// // Get About data
// exports.getAbout = async (req, res) => {
//   try {
//     const about = await About.findOne();
//     if (!about) return res.status(404).json({ message: "No About data found" });
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add team member
// exports.addTeamMember = async (req, res) => {
//   try {
//     const { name, role, bio, image, socials } = req.body;
//     const about = await About.findOne();
//     if (!about) {
//       const newAbout = new About({
//         teams: [{ name, role, bio, image, socials }],
//       });
//       await newAbout.save();
//       return res.json({ data: newAbout });
//     }
//     about.teams.push({ name, role, bio, image, socials });
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete team member
// exports.deleteTeamMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const about = await About.findOne();
//     about.teams = about.teams.filter((t) => t._id.toString() !== id);
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add Service
// exports.addService = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const about = await About.findOne();
//     if (!about) {
//       const newAbout = new About({ services: [{ title, description }] });
//       await newAbout.save();
//       return res.json({ data: newAbout });
//     }
//     about.services.push({ title, description });
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Service
// exports.deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const about = await About.findOne();
//     about.services = about.services.filter((s) => s._id.toString() !== id);
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add Contact
// exports.addContact = async (req, res) => {
//   try {
//     const { type, value } = req.body;
//     const about = await About.findOne();
//     if (!about) {
//       const newAbout = new About({ contacts: [{ type, value }] });
//       await newAbout.save();
//       return res.json({ data: newAbout });
//     }
//     about.contacts.push({ type, value });
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Contact
// exports.deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const about = await About.findOne();
//     about.contacts = about.contacts.filter((c) => c._id.toString() !== id);
//     await about.save();
//     res.json({ data: about });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const About = require("../models/About");

// Get About data
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "No About data found" });
    // ✅ Unwrap data for frontend
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add team member
exports.addTeamMember = async (req, res) => {
  try {
    const { name, role, bio, image, socials } = req.body;
    let about = await About.findOne();
    if (!about) {
      about = new About({ teams: [] });
    }
    about.teams.push({ name, role, bio, image, socials });
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "No About data" });
    about.teams = about.teams.filter((t) => t._id.toString() !== id);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Service
exports.addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    let about = await About.findOne();
    if (!about) {
      about = new About({ services: [] });
    }
    about.services.push({ title, description });
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "No About data" });
    about.services = about.services.filter((s) => s._id.toString() !== id);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Contact
exports.addContact = async (req, res) => {
  try {
    const { type, value } = req.body;
    let about = await About.findOne();
    if (!about) {
      about = new About({ contacts: [] });
    }
    about.contacts.push({ type, value });
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "No About data" });
    about.contacts = about.contacts.filter((c) => c._id.toString() !== id);
    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
