import { Prociono } from "next/font/google";
import fetcher from "../lib/fetcher";
import { CardStat } from "../ui/charts/cards";
import EventsBar from "../ui/charts/events-chart";
import CategoryChart from "../ui/charts/category-chart";
import { Suspense } from "react";
import { Charts } from "../ui/charts/charts";
import { CardStatSkeleton } from "../skeleton/card";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { ChartSkeleton } from "../skeleton/chart";
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
