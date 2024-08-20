import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";

export function CardStat({ data, title }: { data: {}; title: string }) {
  return (
    <Card className="py-4 w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny text-gray-500 uppercase">{title}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h3 className="text-4xl font-bold">{data.count}</h3>
        <div className="flex items-center gap-1 mt-3">
          {data.percentOfChange > 0 ? (
            <ArrowUpCircleIcon className="w-4 text-green-400 h-auto" />
          ) : (
            <ArrowDownCircleIcon className="w-4 text-red-400 h-auto" />
          )}

          <p className="font-bold h-auto">{data.percentOfChange * 100}%</p>
        </div>
      </CardBody>
    </Card>
  );
}
