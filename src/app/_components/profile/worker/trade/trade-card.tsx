"use client";
import EditTrade from "./edit-trade";
import RemoveTrade from "./remove-trade";

const TradeCard = ({
  trade,
}: {
  trade: {
    id: string;
    name: string;
    yearsOfExperience: number;
    pricePerHour: number;
  };
}) => {
  return (
    <div className="flex justify-between rounded-lg p-4 shadow-lg">
      <div className="">
        <div>{trade.name}</div>
        <div>Tapasztalat: {trade.yearsOfExperience} év</div>
      </div>
      <div>
        <p>Órabér (Ft/óra)</p>
        <p>{trade.pricePerHour}</p>
      </div>
      <div className="flex items-center">
        <EditTrade trade={trade} />
        <RemoveTrade tradeId={trade.id} />
      </div>
    </div>
  );
};

export default TradeCard;
