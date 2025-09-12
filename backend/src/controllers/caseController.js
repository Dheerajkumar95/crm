import Case from "../models/Case.js";

const generateCaseId = async () => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0].replace(/-/g, "");

  // Find last case created today
  const lastCase = await Case.findOne({
    caseId: { $regex: `^C-${dateStr}-` },
  }).sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastCase) {
    const lastNumber = parseInt(lastCase.caseId.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  return `C-${dateStr}-${String(nextNumber).padStart(3, "0")}`;
};

export const createCase = async (req, res) => {
  const userId = req.user?._id;
  try {
    const caseId = await generateCaseId();
    const newCase = new Case({
      ...req.body,
      caseId,
      user: userId,
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: "Error creating case", error });
  }
};

export const getCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cases", error });
  }
};
export const getCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;
    const caseData = await Case.findById(caseId)
      .populate("user", "username")
      .sort({ createdAt: -1 });

    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json(caseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching case", error });
  }
};
export const updateCase = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const existingCase = await Case.findById(id);
    if (!existingCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined && updateData[key] !== "") {
        existingCase[key] = updateData[key];
      }
    });

    await existingCase.save();
    res.status(200).json(existingCase);
  } catch (error) {
    console.error("Error updating case:", error);
    res.status(500).json({ message: "Failed to update case", error });
  }
};
export const deleteCase = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({ message: "Case deleted successfully", deletedCase });
  } catch (error) {
    console.error("Error deleting case:", error);
    res.status(500).json({ message: "Failed to delete case", error });
  }
};
export const getCaseId = async (req, res) => {
  try {
    const { accountId } = req.params;
    const cases = await Case.find({ account: accountId }).sort({
      createdAt: -1,
    });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cases", error });
  }
};
