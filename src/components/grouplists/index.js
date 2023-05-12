import React, { useEffect, useState } from "react";
import "./style.css";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const Grouplist = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groupList, setGroupList] = useState([]);
  const [groupReq, setGroupReq] = useState([]);
  const [cancelreq, setCancelreq] = useState([]);
  const [joinmember, setJoinmember] = useState([]);

  const user = useSelector((users) => users.login.loggedIn);

  const [info, setInfo] = useState({
    groupName: "",
    groupTag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const db = getDatabase();

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

  const handleCreate = () => {
    set(push(ref(db, "group")), {
      groupName: info.groupName,
      groupTag: info.groupTag,
      adminName: user.displayName,
      adminId: user.uid,
    }).then(() => {
      setOpen(false);
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "group");
    onValue(starCountRef, (snapshot) => {
      const mygroupListArr = [];
      snapshot.forEach((grouplist) => {
        if (user.uid !== grouplist.val().adminId) {
          mygroupListArr.push({ ...grouplist.val(), id: grouplist.key });
        }
      });
      setGroupList(mygroupListArr);
    });
  }, [db, user.uid]);

  const handleJoinGrp = (item) => {
    set(push(ref(db, "groupjoinrequest")), {
      groupid: item.id,
      groupname: item.groupName,
      grouptag: item.groupTag,
      adminid: item.adminId,
      adminname: item.adminName,
      userid: user.uid,
      username: user.displayName,
    });
  };

  // for show grpjoin
  useEffect(() => {
    const starCountRef = ref(db, "groupjoinrequest");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push(
          item.val().adminid + item.val().userid + item.val().groupid
        );
      });
      setGroupReq(reqarr);
    });
  }, [db]);

  // For joined member
  useEffect(() => {
    const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      const acceptReq = [];
      snapshot.forEach((item) => {
        acceptReq.push(
          item.val().adminId + item.val().userId + item.val().groupId
        );
      });
      setJoinmember(acceptReq);
    });
  }, [db]);

  // For cancel
  useEffect(() => {
    const starCountRef = ref(db, "groupjoinrequest");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push({ ...item.val(), id: item.key });
      });
      setCancelreq(reqarr);
    });
  }, [db]);

  // For cancel
  const handleCancel = (id) => {
    remove(ref(db, "groupjoinrequest/" + id));
  };

  return (
    <>
      <div className="grouplist">
        <div className="grouplist_header">
          <h4>Group Lists</h4>
          <Button variant="contain" onClick={handleOpen}>
            Create Group
          </Button>
        </div>
        {groupList.length === 0 ? (
          <Alert severity="error">No groupList created yet</Alert>
        ) : (
          groupList.map((item, i) => (
            <div className="group-item-wrraper" key={i}>
              <div className="group-images"></div>
              <div className="group-names">
                <span>Admin {item.adminName}</span>
                <h4>{item.groupName}</h4>
                <span>{item.groupTag}</span>
              </div>
              <div className="group-list-btn ">
                {groupReq.includes(item.adminId + user.uid + item.id) ? (
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleCancel(
                        cancelreq.find(
                          (req) =>
                            req.adminid === item.adminId &&
                            req.userid === user.uid
                        ).id
                      )
                    }
                  >
                    Cancel Join
                  </Button>
                ) : joinmember.includes(item.adminId + user.uid + item.id) ? (
                  <div className="group-list-btn">
                    <Button variant="contained">Joined</Button>
                  </div>
                ) : (
                  <div className="group-list-btn">
                    <Button
                      variant="contained"
                      onClick={() => handleJoinGrp(item)}
                    >
                      Join
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New Group
            </Typography>
            <TextField
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              margin="normal"
              fullWidth
              name="groupName"
              value={info.groupName}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Group Tagline"
              variant="outlined"
              margin="normal"
              fullWidth
              name="groupTag"
              value={info.groupTag}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              margin="normal"
              onClick={handleCreate}
            >
              Create New Group
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Grouplist;
