import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* Optional: Global Navbar */}
      <Outlet />
    </>
  );
};

export default App;
