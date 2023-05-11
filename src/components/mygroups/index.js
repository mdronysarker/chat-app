import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { Alert, Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const Mygroups = () => {
  const [mygroup, setMygroup] = useState([]);
  const [groupreqlist, setGroupreqlist] = useState([]);
  const [memberlists, setMemberlists] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [requestopen, setRequestopen] = useState(false);

  const handleReqClose = () => setRequestopen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);

  useEffect(() => {
    const starCountRef = ref(db, "group");
    onValue(starCountRef, (snapshot) => {
      const mygroupArr = [];
      snapshot.forEach((grouplist) => {
        if (user.uid === grouplist.val().adminId) {
          mygroupArr.push({ ...grouplist.val(), id: grouplist.key });
        }
      });
      setMygroup(mygroupArr);
    });
  }, [db, user.uid]);

  const handleReqOpen = (item) => {
    // console.log(item);
    setRequestopen(true);
    const starCountRef = ref(db, "groupjoinrequest");
    onValue(starCountRef, (snapshot) => {
      const groupReqArr = [];
      snapshot.forEach((groupReqList) => {
        if (
          user.uid === groupReqList.val().adminid &&
          groupReqList.val().groupid === item.id
        ) {
          groupReqArr.push({ ...groupReqList.val(), id: groupReqList.key });
        }
      });
      setGroupreqlist(groupReqArr);
    });
  };

  const handleAccept = (item) => {
    set(push(ref(db, "groupmembers")), {
      adminId: item.adminid,
      groupId: item.groupid,
      userId: item.userid,
      adminName: item.adminname,
      groupName: item.groupname,
      userName: item.username,
    })
      .then(() => {
        remove(ref(db, "groupjoinrequest/" + item.id));
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const handleMemberShow = (groupmember) => {
    setOpen(true);
    const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      const memberArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === groupmember.adminId &&
          groupmember.id === item.val().groupId
        ) {
          memberArr.push({ ...item.val(), id: item.key });
        }
      });
      setMemberlists(memberArr);
    });
  };

  return (
    <>
      <div className="mygroups">
        <div className="mygroups_header">
          <h4>My Group</h4>
        </div>
        {mygroup.length === 0 ? (
          <Alert severity="error">No group created yet</Alert>
        ) : (
          mygroup.map((item, i) => (
            <div className="mygroups-item-wrraper" key={i}>
              <div className="mygroups-images"></div>
              <div className="mygroups-names">
                <span>Admin {item.adminName}</span>
                <h4>{item.groupName}</h4>
                <span>{item.groupTag}</span>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={() => handleMemberShow(item)}
                >
                  Info
                </Button>
              </div>
              <div>
                <Button variant="contained" onClick={() => handleReqOpen(item)}>
                  Request
                </Button>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Member
                  </Typography>
                  {memberlists.length === 0 ? (
                    <Alert sx={{ mt: 2 }} severity="info">
                      No req yet!
                    </Alert>
                  ) : (
                    memberlists.map((item, key) => (
                      <div className="mygroups-item-wrraper" key={i}>
                        <div className="mygroups-images"></div>
                        <div className="mygroups-names">
                          <h5>{item.userName}</h5>
                        </div>
                      </div>
                    ))
                  )}
                </Box>
              </Modal>
              <Modal
                open={requestopen}
                onClose={handleReqClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Request Info of Your Group
                  </Typography>
                  {groupreqlist.length === 0 ? (
                    <Alert sx={{ mt: 2 }} severity="info">
                      No req yet!
                    </Alert>
                  ) : (
                    groupreqlist.map((item, key) => (
                      <div className="mygroups-item-wrraper" key={i}>
                        <div className="mygroups-images"></div>
                        <div className="mygroups-names">
                          <h5>{item.username}</h5>
                        </div>
                        <div>
                          <Button
                            variant="contained"
                            onClick={() => handleAccept(item)}
                          >
                            Accept
                          </Button>
                        </div>
                        <div>
                          <Button variant="contained" color="error">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </Box>
              </Modal>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Mygroups;
