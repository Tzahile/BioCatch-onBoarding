import { ApplicationBar } from "./components/AppBar";
import SessionTable from "./components/SessionTable";
import SessionModal, { SessionModes } from "./components/SessionModal";
import { DeviceType, NewSession, SessionData } from "./api/sessions";
import { useState } from "react";
import { session } from "./components/SessionTable/sessionTable.service";
import { BottomNavigation } from "@mui/material";
function App() {
  const handleLogout = () => console.log("Logout clicked!");

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionMode, setSessionMode] = useState(SessionModes.Create);

  const initialSession = {
    muid: "",
    dev_type: DeviceType.pc,
    transferred: 0,
    is_fraud: false,
  };
  const [modalData, setModalData] = useState({
    ...initialSession,
  } as NewSession | SessionData);
  const clearModalData = () => {
    setModalData(initialSession);
  };

  const [trigger, setTrigger] = useState(false);

  const onCreateSession = () => {
    clearModalData();
    setSessionMode(SessionModes.Create);
    setShowSessionModal(true);
  };
  const onUpdateSession = (data: SessionData) => {
    setModalData(data);
    setSessionMode(SessionModes.Update);
    setShowSessionModal(true);
  };
  const onDeleteSession = (_id: SessionData["_id"]) => {
    setModalData({ _id, ...initialSession });
    setSessionMode(SessionModes.Delete);
    setShowSessionModal(true);
  };

  const submitData = async (data: NewSession | SessionData) => {
    if (sessionMode === SessionModes.Create) {
      await session.create(data);
    } else if (sessionMode === SessionModes.Update) {
      await session.update(data as SessionData);
    } else await session.delete((modalData as SessionData)._id);

    setTrigger(!trigger);
    setShowSessionModal(false);
  };

  return (
    <>
      <ApplicationBar logout={handleLogout} />
      <SessionTable
        onCreateSession={onCreateSession}
        onDeleteSession={onDeleteSession}
        onUpdateSession={onUpdateSession}
        triggerRefetchSessions={trigger}
      />
      <SessionModal
        open={showSessionModal}
        close={() => setShowSessionModal(false)}
        mode={sessionMode}
        modelData={modalData}
        submit={submitData}
      />

      <div
        style={{
          position: "absolute",
          height: "25px",
          bottom: 0,
          right: 10,
          fontSize: "12px",
        }}
      >
        made by Tzahi Lehmann
      </div>
    </>
  );
}

export default App;
