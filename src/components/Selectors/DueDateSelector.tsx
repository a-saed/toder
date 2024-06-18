import React, { RefObject, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import {
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { formatDueDateButtonText } from "@/utils/date.util";

interface DueDateSelectorProps {
  selectedDate: Dayjs | null;
  setSelectedDate: (dueDate: Dayjs | null) => void;
  view: "create" | "details";
  canEdit?: boolean;
}

export const DueDateSelector = ({
  selectedDate,
  setSelectedDate,
  view,
  canEdit = true,
}: DueDateSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearSelection = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setSelectedDate(null);
  };

  const handleClickToday = () => {
    handleClose();
    setSelectedDate(dayjs());
  };
  const handleClickTomorrow = () => {
    handleClose();
    setSelectedDate(dayjs().add(1, "day"));
  };
  const handleClickNextWeek = () => {
    handleClose();
    setSelectedDate(dayjs().add(1, "week").startOf("week"));
  };
  const handleCalenderChange = (newValue: Dayjs | null) => {
    handleClose();
    setSelectedDate(newValue);
  };

  return (
    <div style={{ margin: 3 }}>
      <Button
        title="set due date"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={canEdit ? handleClick : () => {}}
        sx={{
          textTransform: "none",
          "& .MuiSvgIcon-root": {
            fontSize: "15px",
          },
        }}
        variant={view === "create" ? "outlined" : "text"}
        size="small"
        color={selectedDate ? "success" : "greeyBtn"}
        startIcon={<CalendarTodayIcon />}
        endIcon={
          selectedDate && canEdit ? (
            <CloseIcon
              onClick={handleClearSelection}
              sx={{
                color: "#777",
                "&:hover": {
                  color: "#CCC",
                },
              }}
            />
          ) : null
        }
      >
        {formatDueDateButtonText(selectedDate)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            p: 0,
            bgcolor: "#0D0D0D",
            maxWidth: 280,
          },
        }}
      >
        <div>
          <MenuItem onClick={handleClickToday} autoFocus>
            <ListItemIcon>
              <TodayIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Today"
              primaryTypographyProps={{ fontSize: "13px", color: "#DDD" }}
            />
            <Typography variant="caption" color="text.secondary">
              {dayjs().format("ddd")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickTomorrow}>
            <ListItemIcon>
              <Brightness7Icon fontSize="small" sx={{ color: "#e68d17" }} />
            </ListItemIcon>
            <ListItemText
              primary="Tomorrow"
              primaryTypographyProps={{ fontSize: "13px", color: "#DDD" }}
            />

            <Typography variant="caption" color="text.secondary">
              {dayjs().add(1, "day").format("ddd")}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickNextWeek}>
            <ListItemIcon>
              <NextWeekIcon fontSize="small" sx={{ color: "#8d30b2" }} />
            </ListItemIcon>
            <ListItemText
              primary="Next Week"
              primaryTypographyProps={{ fontSize: "13px", color: "#DDD" }}
            />
            <Typography variant="caption" color="text.secondary">
              {dayjs().add(1, "week").startOf("week").format("ddd MMM D")}
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={1}>
              <DateCalendar
                autoFocus
                disablePast
                // views={["year", "month", "day"]}
                maxDate={dayjs().add(2, "year").endOf("year")}
                value={selectedDate}
                onChange={handleCalenderChange}
                slotProps={{
                  day: { sx: { p: 0, m: 0, fontSize: 13 } },
                }}
              />
            </Grid>
          </LocalizationProvider>
        </div>
      </Menu>
    </div>
  );
};
