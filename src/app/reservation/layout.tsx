import Navbar from "../_components/navbar";

const ReservationsPageLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default ReservationsPageLayout;
