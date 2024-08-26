export function Card() {
  return (
    <div className="bg-white p-2 sm:p-4 sm:h-32 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-22 sm:h-22 w-full rounded-xl bg-gray-200 animate-pulse"></div>
    </div>
  );
}

export function CardStatSkeleton() {
  return (
    <div className="max-h-md flex w-full gap-2 p-4">
      <div className="flex w-full animate-pulse rounded-md bg-white p-2 shadow">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-12 w-full rounded bg-gray-400"></div>
          <div className="h-12 w-[70%] rounded bg-gray-400"></div>
          <div className="h-12 w-[50%] rounded bg-gray-400"></div>
        </div>
      </div>
      <div className="flex w-full animate-pulse rounded-md bg-white p-2 shadow">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-12 w-full rounded bg-gray-400"></div>
          <div className="h-12 w-[70%] rounded bg-gray-400"></div>
          <div className="h-12 w-[50%] rounded bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
