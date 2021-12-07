import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot,
  Tooltip,
  CartesianGrid,
  Legend,
  Brush,
  ErrorBar,
  AreaChart,
  Area,
  Label,
  LabelList,
} from "recharts";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const data = [
  { date: "Jan 04 2016", price: 105.35 },
  { date: "Jan 05 2016", price: 102.71 },
  { date: "Jan 06 2016", price: 100.7 },
  { date: "Jan 07 2016", price: 96.45 },
  { date: "Jan 08 2016", price: 96.96 },
  { date: "Jan 11 2016", price: 98.53 },
  { date: "Jan 12 2016", price: 99.96 },
  { date: "Jan 13 2016", price: 97.39 },
  { date: "Jan 14 2016", price: 99.52 },
  { date: "Jan 15 2016", price: 97.13 },
  { date: "Jan 19 2016", price: 96.66 },
  { date: "Jan 20 2016", price: 96.79 },
  { date: "Jan 21 2016", price: 96.3 },
  { date: "Jan 22 2016", price: 101.42 },
  { date: "Jan 25 2016", price: 99.44 },
  { date: "Jan 26 2016", price: 99.99 },
  { date: "Jan 27 2016", price: 93.42 },
  { date: "Jan 28 2016", price: 94.09 },
  { date: "Jan 29 2016", price: 97.34 },
  { date: "Feb 01 2016", price: 96.43 },
  { date: "Feb 02 2016", price: 94.48 },
  { date: "Feb 03 2016", price: 96.35 },
  { date: "Feb 04 2016", price: 96.6 },
  { date: "Feb 05 2016", price: 94.02 },
  { date: "Feb 08 2016", price: 95.01 },
  { date: "Feb 09 2016", price: 94.99 },
  { date: "Feb 10 2016", price: 94.27 },
  { date: "Feb 11 2016", price: 93.7 },
  { date: "Feb 12 2016", price: 93.99 },
  { date: "Feb 16 2016", price: 96.64 },
  { date: "Feb 17 2016", price: 98.12 },
  { date: "Feb 18 2016", price: 96.26 },
  { date: "Feb 19 2016", price: 96.04 },
  { date: "Feb 22 2016", price: 96.88 },
  { date: "Feb 23 2016", price: 94.69 },
  { date: "Feb 24 2016", price: 96.1 },
  { date: "Feb 25 2016", price: 96.76 },
  { date: "Feb 26 2016", price: 96.91 },
  { date: "Feb 29 2016", price: 96.69 },
  { date: "Mar 01 2016", price: 100.53 },
  { date: "Mar 02 2016", price: 100.75 },
  { date: "Mar 03 2016", price: 101.5 },
  { date: "Mar 04 2016", price: 103.01 },
  { date: "Mar 07 2016", price: 101.87 },
  { date: "Mar 08 2016", price: 101.03 },
  { date: "Mar 09 2016", price: 101.12 },
  { date: "Mar 10 2016", price: 101.17 },
  { date: "Mar 11 2016", price: 102.26 },
  { date: "Mar 14 2016", price: 102.52 },
  { date: "Mar 15 2016", price: 104.58 },
  { date: "Mar 16 2016", price: 105.97 },
  { date: "Mar 17 2016", price: 105.8 },
  { date: "Mar 18 2016", price: 105.92 },
  { date: "Mar 21 2016", price: 105.91 },
  { date: "Mar 22 2016", price: 106.72 },
  { date: "Mar 23 2016", price: 106.13 },
  { date: "Mar 24 2016", price: 105.67 },
  { date: "Mar 28 2016", price: 105.19 },
  { date: "Mar 29 2016", price: 107.68 },
  { date: "Mar 30 2016", price: 109.56 },
  { date: "Mar 31 2016", price: 108.99 },
  { date: "Apr 01 2016", price: 109.99 },
  { date: "Apr 04 2016", price: 111.12 },
  { date: "Apr 05 2016", price: 109.81 },
  { date: "Apr 06 2016", price: 110.96 },
  { date: "Apr 07 2016", price: 108.54 },
  { date: "Apr 08 2016", price: 108.66 },
  { date: "Apr 11 2016", price: 109.02 },
  { date: "Apr 12 2016", price: 110.44 },
  { date: "Apr 13 2016", price: 112.04 },
  { date: "Apr 14 2016", price: 112.1 },
  { date: "Apr 15 2016", price: 109.85 },
  { date: "Apr 18 2016", price: 107.48 },
  { date: "Apr 19 2016", price: 106.91 },
  { date: "Apr 20 2016", price: 107.13 },
  { date: "Apr 21 2016", price: 105.97 },
  { date: "Apr 22 2016", price: 105.68 },
  { date: "Apr 25 2016", price: 105.08 },
  { date: "Apr 26 2016", price: 104.35 },
  { date: "Apr 27 2016", price: 97.82 },
  { date: "Apr 28 2016", price: 94.83 },
  { date: "Apr 29 2016", price: 93.74 },
  { date: "May 02 2016", price: 93.64 },
  { date: "May 03 2016", price: 95.18 },
  { date: "May 04 2016", price: 94.19 },
];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [readings, setReadings] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://wearable-device-backend.herokuapp.com/readings")
      .then((response) => {
        console.log(response.data);
        setReadings(response.data.readings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 500,
                  }}
                >
                  Heart Rate
                  <LineChart
                    width={500}
                    height={400}
                    data={readings.map((reading) => {
                      return { time: reading.timestamp, pulse: reading.pulse };
                    })}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="time" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="pulse"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#387908"
                      yAxisId={1}
                    />
                  </LineChart>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 500,
                  }}
                >
                  BP
                  <LineChart
                    width={500}
                    height={400}
                    data={readings.map((reading) => {
                      return {
                        time: reading.timestamp,
                        sys: reading.bp.sys,
                        dia: reading.bp.dia,
                      };
                    })}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="time" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="sys"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="dia"
                      stroke="#387908"
                      yAxisId={1}
                    />
                  </LineChart>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 500,
                  }}
                >
                  SpO2
                  <LineChart
                    width={1000}
                    height={400}
                    data={readings.map((reading) => {
                      return {
                        time: reading.timestamp,
                        spo2: reading.spo2,
                      };
                    })}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="time" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="spo2"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    <Line
                      type="monotone"
                      dataKey="dia"
                      stroke="#387908"
                      yAxisId={1}
                    />
                  </LineChart>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return <DashboardContent />;
}
