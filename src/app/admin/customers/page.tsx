import AdminAddCustomer from "@/app/_components/admin/customer/admin-add-customer";
import AdminCustomerRow from "@/app/_components/admin/customer/admin-customer-row";
import Pagination from "@/app/_components/pagination";
import Search from "@/app/_components/search";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

type AdminCustomersPageProps = {
  searchParams?: {
    search?: string;
    page?: string;
    limit?: string;
  };
};

const AdminCustomersPage = async ({
  searchParams,
}: AdminCustomersPageProps) => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/login");
  }

  const search = searchParams?.search;
  const page = searchParams?.page;

  const { customers, fullListLength } = await api.admin.customer.list({
    search,
    page: parseInt(page ?? "1"),
    limit: parseInt(searchParams?.limit ?? "10"),
  });

  return (
    <div>
      <h1 className="my-5 text-center text-3xl">Megrendelők</h1>
      <div className="mx-auto max-w-[1000px]">
        <Search />
        <AdminAddCustomer />
        {customers.map((customer) => (
          <AdminCustomerRow key={customer.id} customerId={customer.id} />
        ))}
        <Pagination listLength={fullListLength} />
      </div>
    </div>
  );
};

export default AdminCustomersPage;
