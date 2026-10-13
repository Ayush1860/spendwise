import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

const inr = (n) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export default function SummaryCard({ summary }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="text.secondary" variant="body2">Total spent</Typography>
        <Typography variant="h4" fontWeight={700}>{inr(summary.total)}</Typography>
        {summary.by_category.length > 0 && <Divider sx={{ my: 1.5 }} />}
        <Stack spacing={0.5}>
          {summary.by_category.map((c) => (
            <Stack key={c.category} direction="row" justifyContent="space-between">
              <Typography variant="body2">{c.category} ({c.count})</Typography>
              <Typography variant="body2" fontWeight={600}>{inr(c.total)}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
