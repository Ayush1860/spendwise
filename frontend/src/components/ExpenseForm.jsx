import { useState } from "react";
import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { CATEGORIES } from "../api";

const today = () => new Date().toISOString().slice(0, 10);

export default function ExpenseForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || { title: "", amount: "", category: "Food", date: today() }
  );

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const valid = form.title.trim() && Number(form.amount) > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSave({ ...form, amount: Number(form.amount) });
    if (!initial) setForm({ title: "", amount: "", category: "Food", date: today() });
  };

  return (
    <Paper component="form" onSubmit={submit} sx={{ p: 2.5 }} variant="outlined">
      <Typography variant="h6" mb={2}>{initial ? "Edit expense" : "Add expense"}</Typography>
      <Stack spacing={2}>
        <TextField label="Title" value={form.title} onChange={set("title")} required />
        <TextField
          label="Amount (₹)"
          type="number"
          value={form.amount}
          onChange={set("amount")}
          inputProps={{ min: 0.01, step: 0.01 }}
          required
        />
        <TextField select label="Category" value={form.category} onChange={set("category")}>
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          type="date"
          value={form.date}
          onChange={set("date")}
          InputLabelProps={{ shrink: true }}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" disabled={!valid} fullWidth>
            {initial ? "Update" : "Add"}
          </Button>
          {initial && (
            <Button onClick={onCancel} fullWidth>Cancel</Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
