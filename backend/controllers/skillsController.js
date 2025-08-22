// controllers/skillsController.js
const Home = require("../models/home");

// small helper
const isValidDate = (d) => !Number.isNaN(new Date(d).getTime());
const clampPct = (v) => Math.max(0, Math.min(100, Number(v)));

//
// GET: return the skills doc (sorted by timestamps if you want a list)
// NOTE: your frontend actually reads /api/home/skill from homeRoutes.
// This GET here is handy for admin tools or manual checks.
//
exports.getSkills = async (req, res) => {
  try {
    const doc = await Home.findOne({ section: "skill" });
    if (!doc)
      return res.status(404).json({ message: "Skills section not found" });
    return res.json({ message: "ok", data: doc });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching skills", error });
  }
};

//
// POST: add a single skill into a category
// body: { category, name, percentage?, date? }
// percentage optional (0-100), date optional (ISO string or yyyy-mm-dd)
//
exports.addSkill = async (req, res) => {
  try {
    const { category, name, percentage, date } = req.body;

    if (!category?.trim() || !name?.trim()) {
      return res
        .status(400)
        .json({ message: "Category and Skill Name are required" });
    }

    const doc = await Home.findOne({ section: "skill" });
    if (!doc)
      return res.status(404).json({ message: "Skills section not found" });

    if (!Array.isArray(doc.content?.[category])) {
      if (!doc.content || typeof doc.content !== "object") doc.content = {};
      doc.content[category] = [];
    }

    const item = {
      name: name.trim(),
      // if percentage provided, clamp to 0–100; else leave undefined
      ...(percentage !== undefined ? { percentage: clampPct(percentage) } : {}),
      // if date provided, validate; else default to today
      date: date ? (isValidDate(date) ? new Date(date) : null) : new Date(),
    };

    if (item.date === null) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    doc.content[category].push(item);
    await doc.save();
    return res.status(201).json({ message: "Skill added", data: doc });
  } catch (error) {
    return res.status(500).json({ message: "Error adding skill", error });
  }
};

//
// PUT: update one skill only (per-skill date / name / percentage)
// body: { category, index, name?, percentage?, date? }
// - Only the provided fields are changed.
// - If date is omitted, it stays as-is (no auto-change).
// - Works even if old item was a plain string (auto-converts to object).
//
exports.updateSkill = async (req, res) => {
  try {
    const { category, index, name, percentage, date } = req.body;

    if (!category?.trim() || index === undefined) {
      return res
        .status(400)
        .json({ message: "category and index are required" });
    }

    const doc = await Home.findOne({ section: "skill" });
    if (!doc)
      return res.status(404).json({ message: "Skills section not found" });

    if (
      !Array.isArray(doc.content?.[category]) ||
      !doc.content[category][index]
    ) {
      return res
        .status(400)
        .json({ message: "Skill not found in this category" });
    }

    // normalize current item into an object
    let current = doc.content[category][index];
    if (typeof current !== "object" || current === null) {
      current = { name: String(current) };
    }

    const updated = { ...current };

    if (name !== undefined) {
      if (!name?.trim()) {
        return res.status(400).json({ message: "Skill name cannot be empty" });
      }
      updated.name = name.trim();
    }

    if (percentage !== undefined) {
      const pct = clampPct(percentage);
      if (Number.isNaN(pct)) {
        return res.status(400).json({ message: "percentage must be a number" });
      }
      updated.percentage = pct;
    }

    if (date !== undefined) {
      if (date === null || date === "") {
        // allow clearing the date if you ever want that
        delete updated.date;
      } else if (!isValidDate(date)) {
        return res.status(400).json({ message: "Invalid date format" });
      } else {
        updated.date = new Date(date);
      }
    }

    // save back
    doc.content[category][index] = updated;
    await doc.save();

    return res.json({ message: "Skill updated", data: doc });
  } catch (error) {
    return res.status(500).json({ message: "Error updating skill", error });
  }
};

//
// DELETE: remove one skill from a category
// body: { category, index }
//
exports.deleteSkill = async (req, res) => {
  try {
    const { category, index } = req.body;

    if (!category?.trim() || index === undefined) {
      return res
        .status(400)
        .json({ message: "category and index are required" });
    }

    const doc = await Home.findOne({ section: "skill" });
    if (!doc)
      return res.status(404).json({ message: "Skills section not found" });

    if (
      !Array.isArray(doc.content?.[category]) ||
      !doc.content[category][index]
    ) {
      return res
        .status(400)
        .json({ message: "Skill not found in this category" });
    }

    doc.content[category].splice(index, 1);
    await doc.save();

    return res.json({ message: "Skill deleted", data: doc });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting skill", error });
  }
};
