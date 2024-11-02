"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./button";
import ArrowIcon from "./icons/arrow";

type PaginationProps = {
  listLength: number;
};

const Pagination = ({ listLength }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pages = Math.ceil(
    listLength /
      parseInt(new URLSearchParams(searchParams).get("limit") ?? "10"),
  );

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

  return (
    <div className="mb-10 mt-8 flex justify-between">
      <div>
        Limit:
        <div className="dropdown dropdown-top">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex gap-2 rounded-full border-2 border-sky-500 bg-white px-4 py-2 transition-all duration-200 hover:bg-sky-100"
          >
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
      <div className="">
        <Button
          onClick={() => handlePagination("prev")}
          disabled={new URLSearchParams(searchParams).get("page") === "1"}
        >
          Előző
        </Button>
        {Array.from({ length: pages }, (_, index) => (
          <Button
            key={index}
            className={`${(new URLSearchParams(searchParams).get("page") === null && index == 0) || new URLSearchParams(searchParams).get("page") === (index + 1).toString() ? "bg-sky-500 text-white" : ""}`}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
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
