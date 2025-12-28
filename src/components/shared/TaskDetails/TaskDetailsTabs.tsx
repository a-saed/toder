import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { NotesPanel, AttachmentsPanel, SubTasksPanel } from "./TabPanels";

type PanelItem = {
  id: string;
  PanelComponent: React.ReactNode;
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const panels: PanelItem[] = [
  { id: "subtasks", PanelComponent: <SubTasksPanel /> },
  { id: "notes", PanelComponent: <NotesPanel /> },
  { id: "Attachments", PanelComponent: <AttachmentsPanel /> },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`task-details-tabpanel-${index}`}
      aria-labelledby={`task-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `task-details-tab-${index}`,
    "aria-controls": `task-details-tabpanel-${index}`,
  };
}

export default function TaskDetailsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          zIndex: 1,
          top: -20,
          bgcolor: "#1D1C1C",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="task details tabs"
          variant="fullWidth"
          scrollButtons
          allowScrollButtonsMobile
          centered
        >
          <Tab
            sx={{ textTransform: "none", fontSize: "0.8rem" }}
            label="SubTasks"
            icon={<FormatListBulletedIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "none", fontSize: "0.8rem" }}
            label="Notes"
            icon={<EventNoteIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(1)}
          />
          <Tab
            sx={{ textTransform: "none", fontSize: "0.8rem" }}
            label="Attachments"
            icon={<AttachmentIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      {panels.map(({ PanelComponent }: PanelItem, i) => (
        <CustomTabPanel key={i} value={value} index={i}>
          {PanelComponent}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
