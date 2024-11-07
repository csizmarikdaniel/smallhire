import { Suspense } from "react";
import Navbar from "../_components/navbar";
import Loading from "../loading";

const ReservationsPageLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Navbar />
        {children}
      </div>
    </Suspense>
  );
};

export default ReservationsPageLayout;
