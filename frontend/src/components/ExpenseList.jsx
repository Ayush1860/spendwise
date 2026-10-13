import {
  Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const inr = (n) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return (
      <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">No expenses yet. Add your first one.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((e) => (
            <TableRow key={e.id} hover>
              <TableCell>{e.title}</TableCell>
              <TableCell><Chip label={e.category} size="small" /></TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{e.date}</TableCell>
              <TableCell align="right">{inr(e.amount)}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onEdit(e)}><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(e.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
