"use client";

import { api } from "@/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const trades = api.guest.trades.useQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = (trade: string) => {
    const params = new URLSearchParams(searchParams);
    const trades = params.get("trade")?.split("&") ?? [];
    console.log(trades);
    if (trades.includes(trade)) {
      params.set("trade", trades.filter((t) => t !== trade).join("&"));
      if (params.get("trade") === "") {
        params.delete("trade");
      }
    } else {
      params.set("trade", [...trades, trade].join("&"));
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {trades.data?.map((trade) => (
        <button
          key={trade.id}
          className={`rounded-md bg-gray-200 px-4 py-2 ${new URLSearchParams(searchParams).get("trade")?.split("&").includes(trade.name) ? "bg-gray-400" : ""}`}
          onClick={() => {
            handleFilter(trade.name);
          }}
        >
          {trade.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
