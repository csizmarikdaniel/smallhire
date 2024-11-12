import { Suspense } from "react";
import Navbar from "../_components/navbar";
import Loading from "../_components/loading";

const MyProfileLayout = ({
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

export default MyProfileLayout;
