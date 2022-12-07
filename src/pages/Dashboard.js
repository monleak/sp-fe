import React from "react";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { Budget } from "../components/dashboard/bugget";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Button variant="contained">Hello World</Button>
      <Link href="/">Link</Link>
      <Budget />
    </div>
  );
};

export default Dashboard;
