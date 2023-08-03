import { Box, AppBar, Toolbar, Typography, SvgIcon } from "@mui/material";
import biocatchIcon from "../assets/biocatch-logos-idF5GRskJ5.svg";

type ApplicationBarProps = {
  logout: () => void;
};

export const ApplicationBar = (props: ApplicationBarProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar>
      <Toolbar>
        <Box sx={{ width: "100%", display: "flex" }}>
          <SvgIcon component="object">
            <embed
              type="image/svg+xml"
              src={biocatchIcon}
              style={{
                height: "100%",
              }}
            />
          </SvgIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BioCatch
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              color: "inherit",
            }}
          >
            <span onClick={props.logout}>Logout</span>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);
