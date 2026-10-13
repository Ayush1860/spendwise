import { useEffect, useState } from "react";
import { Alert, Box, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { CATEGORIES, createExpense, deleteExpense, getExpenses, getSummary, updateExpense } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryCard from "./components/SummaryCard";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, by_category: [] });
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [list, sum] = await Promise.all([getExpenses(filter), getSummary()]);
      setExpenses(list);
      setSummary(sum);
      setError("");
    } catch {
      setError("Could not reach the API. Is the backend running?");
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleSave = async (data) => {
    if (editing) await updateExpense(editing.id, data);
    else await createExpense(data);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    load();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        SpendWise
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard summary={summary} />
          <Box mt={3}>
            <ExpenseForm
              key={editing?.id || "new"}
              initial={editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            select
            size="small"
            label="Filter by category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ mb: 2, minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <ExpenseList expenses={expenses} onEdit={setEditing} onDelete={handleDelete} />
        </Grid>
      </Grid>
    </Container>
  );
}
