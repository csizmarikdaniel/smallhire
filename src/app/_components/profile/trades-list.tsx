import { api } from "@/trpc/server";

const TradesList = async ({ workerId }: { workerId: string }) => {
  const trades = await api.worker.trades.list();
  return (
    <div>
      {trades.map((trade) => (
        <div key={trade.name}>
          {trade.name} - {trade.yearsOfExperience}
        </div>
      ))}
    </div>
  );
};

export default TradesList;
