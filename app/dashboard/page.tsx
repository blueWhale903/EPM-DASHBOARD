import { CardStat } from "../ui/charts/Cards";
import { Suspense } from "react";
import { Charts } from "../ui/charts/Charts";
import { CardStatSkeleton } from "../ui/skeleton/Card";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { ChartSkeleton } from "../ui/skeleton/Chart";

export default async function Page() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <h1 className="text-4xl mb-4 font-bold">Overview</h1>
      <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
        <Suspense fallback={<CardStatSkeleton />}>
          <CardStat />
        </Suspense>
      </Box>
      <Suspense fallback={<ChartSkeleton />}>
        <Charts />
      </Suspense>
    </Container>
  );
}
