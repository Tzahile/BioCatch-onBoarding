import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DeviceType, NewSession, SessionData } from "../api/sessions";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";

export enum SessionModes {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
}

export default function SessionModal(props: {
  open: boolean;
  mode: SessionModes;
  modelData: NewSession | SessionData;
  close: () => void;
  submit: (data: NewSession | SessionData) => void;
}) {
  const modalTitle = `${props.mode} a session`;

  useEffect(() => {
    if (!props.open) return;

    setMuid(props.modelData.muid);
    setDeviceType(props.modelData.dev_type);
    setTransferred(props.modelData.transferred);
    setIsFraud(props.modelData.is_fraud);
  }, [props.open]);

  const [muid, setMuid] = useState(props.modelData.muid ?? "");
  const [deviceType, setDeviceType] = useState(
    props.modelData.dev_type ?? DeviceType.pc
  );
  const [transferred, setTransferred] = useState(
    props.modelData.transferred ?? 0
  );
  const [isFraud, setIsFraud] = useState(props.modelData.is_fraud || false);

  const createEditForm = (
    <>
      <Grid2 xs={12}>
        <TextField
          id="muid"
          label="MUID"
          variant="outlined"
          value={muid}
          sx={{ width: "100%" }}
          onChange={(e) => setMuid(e.target.value)}
        ></TextField>
      </Grid2>
      <Grid2 xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Device Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deviceType}
            label="Device Type"
            onChange={(e) => setDeviceType(e.target.value as DeviceType)}
          >
            <MenuItem value={DeviceType.pc}>PC</MenuItem>
            <MenuItem value={DeviceType.ios}>IOS</MenuItem>
            <MenuItem value={DeviceType.android}>Android</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 xs={12}>
        <TextField
          id="transferred-amount"
          label="Transferred $"
          variant="outlined"
          sx={{ width: "100%" }}
          value={transferred}
          onChange={(e) => setTransferred(Number(e.target.value))}
        />
      </Grid2>
      <Grid2 xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={isFraud}
              onChange={(e) => setIsFraud(e.target.checked)}
            />
          }
          label="Is a fraud"
        />
      </Grid2>
    </>
  );

  return (
    <div>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={props.open}
        onClose={props.close}
      >
        <Paper
          sx={{
            padding: "16px",
            width: "25%",
          }}
        >
          <Grid2 container spacing={{ xs: 2, md: 3 }}>
            <Grid2 xs={12}>
              <Typography id="modal-title" variant="h6" component="h2">
                {props.mode === SessionModes.Delete
                  ? "Are you sure you want to delete the session?"
                  : modalTitle}
              </Typography>
              <Divider />
            </Grid2>
            {props.mode !== SessionModes.Delete && createEditForm}
          </Grid2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "16px",
            }}
          >
            <Button
              onClick={props.close}
              variant="outlined"
              sx={{ marginRight: "4px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                props.submit({
                  _id: props.modelData._id,
                  muid,
                  dev_type: deviceType,
                  transferred,
                  is_fraud: isFraud,
                })
              }
              color={props.mode === SessionModes.Delete ? "error" : "primary"}
              variant="contained"
            >
              {props.mode}
            </Button>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
