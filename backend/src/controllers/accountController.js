// src/controllers/accountController.js
import Account from "../models/Account.js";

export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accounts", error });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    res.json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Failed to fetch account" });
  }
};

export const updateAccountById = async (req, res) => {
  try {
    const updated = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Failed to update account" });
  }
};
