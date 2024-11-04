import Navbar from "../_components/navbar";

const MyProfileLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MyProfileLayout;
