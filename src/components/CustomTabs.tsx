import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { v4 } from "uuid";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ITab {
  header: string;
  content: JSX.Element;
}
interface ICustomTabs {
  items: ITab[];
}
export default function CustomTabs(props: ICustomTabs) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className="ml-3"
          aria-label="basic tabs example"
        >
          {props.items.map((item: ITab, index: number) => (
            <Tab
              key={`key-${v4()}`}
              label={item.header}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {props.items.map((item: ITab, index: number) => (
        <TabPanel key={`key-${v4()}`} index={index} value={value}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
}
