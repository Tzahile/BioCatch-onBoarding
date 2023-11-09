import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ErrorOutline, DeleteOutline, EditOutlined } from "@mui/icons-material";

import { session } from "./sessionTable.service";
import { SessionData } from "../../api/sessions";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const tableHeaders = ["MUID", "Device Type", "Transferred $", "Fraud"];

export default function sessionTable(props: {
  onCreateSession: () => void;
  onUpdateSession: (data: any) => void;
  onDeleteSession: (_id: SessionData["_id"]) => void;
  triggerRefetchSessions: boolean;
}) {
  const [allSessions, setAllSessions] = useState([] as SessionData[]);

  const fetchAllSessions = async () => {
    const allSessions = await session.getAll();
    setAllSessions(allSessions);
  };
  useEffect(() => {
    fetchAllSessions();
  }, [props.triggerRefetchSessions]);

  const modalHeader = (
    <Grid2 xs={12} xsOffset={9}>
      <Button variant="contained" fullWidth onClick={props.onCreateSession}>
        new session
      </Button>
    </Grid2>
  );
  const modalBody = (
    <Grid2 xs={12}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allSessions.map((session, index) => (
              <TableRow key={index}>
                <TableCell>{session.muid}</TableCell>
                <TableCell>{session.dev_type}</TableCell>
                <TableCell>{session.transferred}</TableCell>
                <TableCell
                  sx={{
                    display: "table-cell",
                    ...(session.is_fraud && { color: "red" }),
                  }}
                >
                  {session.is_fraud ? (
                    <div>
                      <ErrorOutline
                        fontSize="small"
                        sx={{ marginRight: "4px" }}
                      />
                      <span>YES</span>
                    </div>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => props.onUpdateSession(session)}>
                    <EditOutlined />
                  </Button>
                  <Button
                    onClick={() => props.onDeleteSession(session._id)}
                    color="error"
                  >
                    <DeleteOutline />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  );

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid2
        container
        rowSpacing={2}
        sx={{
          textAlignLast: "center",
        }}
      >
        {modalHeader}
        {modalBody}
      </Grid2>
    </Box>
  );
}
