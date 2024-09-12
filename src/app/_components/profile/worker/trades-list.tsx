import { api } from "@/trpc/server";
import TradeCard from "./trade-card";

const TradesList = async () => {
  const trades = await api.worker.trades.list();
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-2 rounded-lg p-2 shadow-lg">
      <h1 className="mb-5 text-center text-xl">Mesterségek</h1>
      {trades.map((trade) => (
        <TradeCard trade={trade} key={trade.id} />
      ))}
    </div>
  );
};

export default TradesList;
