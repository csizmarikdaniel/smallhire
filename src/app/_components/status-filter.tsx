"use client";

import ArrowIcon from "./icons/arrow";
import ReservationStatusTag from "./profile/reservation-status-tag";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AllStatuses = [
  "RESERVED",
  "CANCELLED",
  "REJECTED",
  "CREATEDOFFER",
  "ACCEPTEDOFFER",
  "REJECTEDOFFER",
  "COMPLETED",
];

const StatusFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const status = params.get("status");
  const checkedStatuses = status?.split(",") ?? [...AllStatuses];
  const handleCheckboxChange = (
    newStatus:
      | "RESERVED"
      | "CANCELLED"
      | "REJECTED"
      | "CREATEDOFFER"
      | "ACCEPTEDOFFER"
      | "REJECTEDOFFER"
      | "COMPLETED",
  ) => {
    if (checkedStatuses.includes(newStatus)) {
      checkedStatuses.splice(checkedStatuses.indexOf(newStatus), 1);
    } else {
      checkedStatuses.push(newStatus);
    }
    if (checkedStatuses.sort().join(",") == AllStatuses.sort().join(",")) {
      params.delete("status");
    } else {
      params.set("status", checkedStatuses.join(","));
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-sm m-1">
        <ArrowIcon direction="down" height={10} width={10} />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("RESERVED")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("RESERVED")}
            />
            <ReservationStatusTag status="RESERVED" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("CANCELLED")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("CANCELLED")}
            />
            <ReservationStatusTag status="CANCELLED" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("REJECTED")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("REJECTED")}
            />
            <ReservationStatusTag status="REJECTED" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("CREATEDOFFER")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("CREATEDOFFER")}
            />
            <ReservationStatusTag status="CREATEDOFFER" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("ACCEPTEDOFFER")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("ACCEPTEDOFFER")}
            />
            <ReservationStatusTag status="ACCEPTEDOFFER" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("REJECTEDOFFER")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("REJECTEDOFFER")}
            />
            <ReservationStatusTag status="REJECTEDOFFER" />
          </label>
        </li>
        <li>
          <label className="fieldset-label">
            <input
              type="checkbox"
              defaultChecked={
                params.get("status")
                  ? checkedStatuses.includes("COMPLETED")
                  : true
              }
              className="checkbox checkbox-sm"
              onChange={() => handleCheckboxChange("COMPLETED")}
            />
            <ReservationStatusTag status="COMPLETED" />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default StatusFilter;
