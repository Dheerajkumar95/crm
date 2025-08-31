// src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  authenticated: true,
  loading: false,

  setLoading: (val) => set({ loading: val }),
  setAuth: (user) => set({ user, authenticated: true }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      set({ user: res.data.user, authenticated: true });
      return true;
    } catch (error) {
      set({ user: null, authenticated: false });
      return false;
    }
  },

  // Leads
  Lead: async (formData) => {
    try {
      await axiosInstance.post("/leads", formData);
      toast.success("Lead Created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lead creation failed");
    }
  },

  // Accounts
  createAccount: async (accountData) => {
    try {
      await axiosInstance.post("/accounts", accountData);
      toast.success("Account Created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Account creation failed");
    }
  },

  // Contacts
  Contact: async (contact) => {
    try {
      await axiosInstance.post("/contacts/", contact);
      toast.success("Contact Created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating contact");
    }
  },

  // Opportunities
  Opportunity: async (opportunity) => {
    try {
      await axiosInstance.post("/opportunities/", opportunity);
      toast.success("Opportunity Created!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Opportunity creation failed"
      );
    }
  },

  // Tasks
  Task: async (task) => {
    try {
      await axiosInstance.post("/tasks/", task);
      toast.success("Task Created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Task creation failed");
    }
  },

  // Invoices
  Invoice: async (invoice) => {
    try {
      await axiosInstance.post("/invoices/", invoice);
      toast.success("Invoice Created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invoice creation failed");
    }
  },

  // Billings
  Billing: async (billing) => {
    try {
      await axiosInstance.post("/billings/", billing);
      toast.success("Billing Saved!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Billing creation failed");
    }
  },
}));
