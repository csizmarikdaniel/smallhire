import { api } from "@/trpc/server";
import AdminTradeCard from "./admin-trade-card";
import AdminAddTrade from "./admin-add-trade";

const AdminTradesList = async ({ id }: { id: string }) => {
  const tradeIds = await api.admin.worker.trade.list({ workerId: id });
  return (
    <div className="rounded-lg bg-white p-5">
      <h2 className="text-center text-xl font-bold">Mesterségek</h2>
      <div className="flex flex-col gap-3">
        {tradeIds.map((trade) => (
          <AdminTradeCard id={trade.id} key={trade.id} />
        ))}
      </div>
      <div className="text-center">
        <AdminAddTrade id={id} />
      </div>
    </div>
  );
};

export default AdminTradesList;
