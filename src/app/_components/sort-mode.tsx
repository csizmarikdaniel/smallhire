"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ArrowIcon from "./icons/arrow";

const SortMode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSort = (type: "asc" | "desc" | "earliest" | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (type == undefined) {
      params.delete("sort");
    } else {
      params.set("sort", type);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Rendezés
        <ArrowIcon direction="down" height={20} width={20} />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a
            onClick={() => handleSort(undefined)}
            className={
              new URLSearchParams(searchParams).get("sort") == undefined
                ? "bg-slate-400"
                : ""
            }
          >
            Alapértelmezett
          </a>
        </li>
        <li>
          <a
            onClick={() => handleSort("asc")}
            className={
              new URLSearchParams(searchParams).get("sort") == "asc"
                ? "bg-slate-400"
                : ""
            }
          >
            Név szerint növekvő (A-Z)
          </a>
        </li>
        <li>
          <a
            onClick={() => handleSort("desc")}
            className={
              new URLSearchParams(searchParams).get("sort") == "desc"
                ? "bg-slate-400"
                : ""
            }
          >
            Név szerint csökkenő (Z-A)
          </a>
        </li>
        <li>
          <a
            onClick={() => handleSort("earliest")}
            className={
              new URLSearchParams(searchParams).get("sort") == "earliest"
                ? "bg-slate-400"
                : ""
            }
          >
            Legkorábbi szabad nap
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortMode;
