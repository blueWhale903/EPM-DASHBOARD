import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import fetcher from "@/app/lib/fetcher";
import Box from "@mui/material";
import { Typography } from "@mui/material";
export async function CardStat() {
  const eventCount = await fetcher(
    `${process.env.API}/statistics/events/count?month=1`
  ).then((res) => res.json());
  const participationCount = await fetcher(
    `${process.env.API}/statistics/participations/count?month=1`
  ).then((res) => res.json());
  return (
    <div className="flex gap-2 w-full">
      <Card sx={{ width: "100%" }}>
        <CardHeader title="Total Events" />
        <CardContent>
          <Typography variant="h2" fontWeight={"bold"}>
            {eventCount.data.count}
          </Typography>
          <div className="flex gap-2">
            {eventCount.percentOfChange > 0 ? (
              <ArrowUpCircleIcon className="w-4 text-green-400 h-auto" />
            ) : (
              <ArrowDownCircleIcon className="w-4 text-red-400 h-auto" />
            )}

            <p className="font-bold h-auto">
              {eventCount.data.percentOfChange * 100}%
            </p>
          </div>
        </CardContent>
      </Card>
      <Card sx={{ width: "100%" }}>
        <CardHeader title="Total Participations" />
        <CardContent>
          <Typography variant="h2" fontWeight={"bold"}>
            {participationCount.data.count}
          </Typography>
          <div className="flex gap-2">
            {participationCount.percentOfChange > 0 ? (
              <ArrowUpCircleIcon className="w-4 text-green-400 h-auto" />
            ) : (
              <ArrowDownCircleIcon className="w-4 text-red-400 h-auto" />
            )}

            <p className="font-bold h-auto">
              {participationCount.data.percentOfChange * 100}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
