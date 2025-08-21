import Oat from "../models/Oat.js";

const getAllOats = async (_, res) => {
  try {
    const oats = await Oat.find();
    res.status(200).json(oats);
  } catch (error) {
    console.error("Error in getAllOats:", error);
    res.status(500).json({ message: "Error fetching oats", error });
  }
};

const getOat = async (req, res) => {
  try {
    const oat = await Oat.findById(req.params.id);
    if (!oat) {
      return res.status(404).json({ message: "Oat not found" });
    }
    res.status(200).json(oat);
  } catch (error) {
    console.error("Error in getOat:", error);
    res.status(500).json({ message: "Error fetching oat", error });
  }
};

const createOat = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newOat = new Oat({ title, content });
    await newOat.save();
    res.status(201).json(newOat);
  } catch (error) {
    console.error("Error in createOat:", error);
    res.status(500).json({ message: "Error creating oat", error });
  }
};

const updateOat = (req, res) => {
  try {
    const {title, content } = req.body;
    Oat.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedOat) {
      return res.status(404).json({ message: "Oat not found" });
    }
    res.status(200).json(updateOat);
  } catch (error) {
    console.error("Error in updateOat:", error);
    res.status(500).json({ message: "Error updating oat", error });
  }
};

const deleteOat = async(req, res) => {
  try {
    const deletedOat = await Oat.findByIdAndDelete(req.params.id);
    if (!deletedOat) {
      return res.status(404).json({ message: "Oat not found" });
    }
    res.status(204).json(`Oat with ID ${req.params.id} deleted successfully`);
  } catch (error) {
    console.error("Error in deleteOat:", error);
    res.status(500).json({ message: "Error deleting oat", error });
  }
};

export { getAllOats, getOat, createOat, updateOat, deleteOat };
