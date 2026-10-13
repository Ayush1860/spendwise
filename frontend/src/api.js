import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

export const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Health", "Other"];

export const getExpenses = (category) =>
  api.get("/expenses", { params: category ? { category } : {} }).then((r) => r.data);

export const getSummary = () => api.get("/expenses/summary").then((r) => r.data);

export const createExpense = (data) => api.post("/expenses", data).then((r) => r.data);

export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data).then((r) => r.data);

export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
