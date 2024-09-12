const ReservationStatusTag = ({ status }: { status: string }) => {
  const statusClasses = (status: string) => {
    switch (status) {
      case "RESERVED":
        return { bg: "bg-yellow-500", text: "Foglalva" };
      case "CANCELLED":
        return { bg: "bg-red-500", text: "Lemondva" };
      case "REJECTED":
        return { bg: "bg-red-500", text: "Elutasítva" };
      case "CREATEDOFFER":
        return { bg: "bg-blue-500", text: "Ajánlatot tett" };
      case "ACCEPTEDOFFER":
        return { bg: "bg-green-500", text: "Ajánlat elfogadva" };
      case "REJECTEDOFFER":
        return { bg: "bg-red-500", text: "Ajánlat elutasítva" };
      case "COMPLETED":
        return { bg: "bg-green-500", text: "Befejezve" };
      default:
        return { bg: "bg-gray-500", text: "Ismeretlen" };
    }
  };
  return (
    <div className={`badge ${statusClasses(status).bg}`}>
      {statusClasses(status).text}
    </div>
  );
};

export default ReservationStatusTag;
