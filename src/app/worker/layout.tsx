import Navbar from "../_components/navbar";

const WorkerLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default WorkerLayout;
