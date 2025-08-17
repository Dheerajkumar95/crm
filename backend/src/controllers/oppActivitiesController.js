import Activity from "../models/opportunityActivities.js";

// Add activity
export const addActivitys = async (req, res) => {
  const userId = req.user?._id;
  try {
    const {
      type,
      subject,
      description,
      comments,
      dueDate,
      startDateTime,
      endDateTime,
      location,
      OpportunitiesId,
    } = req.body;

    const activity = new Activity({
      type,
      subject,
      description,
      comments,
      dueDate,
      startDateTime,
      endDateTime,
      location,
      OpportunitiesId,
      user: userId,
    });

    await activity.save();
    res.status(201).json({ success: true, activity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getActivitiesByOpportunitiesId = async (req, res) => {
  try {
    const { OpportunitiesId } = req.params;
    const activities = await Activity.find({ OpportunitiesId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteActivitys = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json({ message: `${activity.type} deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting activity", error: error.message });
  }
};
