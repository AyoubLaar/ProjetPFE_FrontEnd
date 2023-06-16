import * as React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Header from "../components/Header";
import Reservations from "../components/Reservations";

export default function Profile() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />
      <Paper sx={{ typography: "body1", margin: "30px" }} elevation={10}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Reservations" value="1" />
              <Tab label="Details du compte" value="2" />
              <Tab label="Anonces" value="3" />
            </TabList>
          </Box>
          <TabPanel sx={{ overflowX: "auto" }} value="1">
            <Reservations />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Paper>
    </>
  );
}
