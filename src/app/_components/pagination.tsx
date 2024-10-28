"use client";

import { api } from "@/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./button";
import ArrowIcon from "./icons/arrow";

const Pagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pages =
    api.guest.numberOfPages.useQuery({
      pageSize: 10,
      search: new URLSearchParams(searchParams).get("search") ?? undefined,
      trades:
        new URLSearchParams(searchParams).get("trade")?.split("&") ?? undefined,
    }).data ?? 1;

  const handlePagination = (page: number | "prev" | "next") => {
    const params = new URLSearchParams(searchParams);

    if (page === "prev") {
      const currentPage = parseInt(params.get("page") ?? "1");

      params.set("page", (currentPage - 1).toString());
    } else if (page === "next") {
      const currentPage = parseInt(params.get("page") ?? "1");
      params.set("page", (currentPage + 1).toString());
    } else {
      params.set("page", page.toString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  console.log(new URLSearchParams(searchParams).get("page"));

  return (
    <div className="mt-8 flex justify-between">
      <div>
        Limit:
        <div className="dropdown dropdown-top">
          <div tabIndex={0} role="button" className="btn m-1">
            {new URLSearchParams(searchParams).get("limit") ?? 10}
            <ArrowIcon direction="down" height={20} width={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {[10, 20, 50].map((limit) => (
              <li key={limit}>
                <a
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("limit", limit.toString());
                    router.replace(`${pathname}?${params.toString()}`);
                  }}
                  className={
                    new URLSearchParams(searchParams).get("limit") ==
                    limit.toString()
                      ? "bg-slate-400"
                      : ""
                  }
                >
                  {limit}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Button
          className="mx-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
          onClick={() => handlePagination("prev")}
          disabled={new URLSearchParams(searchParams).get("page") === "1"}
        >
          Előző
        </Button>
        {Array.from({ length: pages }, (_, index) => (
          <Button
            key={index}
            className={`mx-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 ${(new URLSearchParams(searchParams).get("page") === null && index == 0) || new URLSearchParams(searchParams).get("page") === (index + 1).toString() ? "bg-gray-400" : ""}`}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className="mx-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
          disabled={
            new URLSearchParams(searchParams).get("page") === pages.toString()
          }
          onClick={() => handlePagination("next")}
        >
          Következő
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
