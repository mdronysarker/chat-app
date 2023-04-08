import React, { useState } from "react";
import "./style.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const Grouplist = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <div className="grouplist">
        <div className="grouplist_header">
          <h4>Group Lists</h4>
          <Button variant="contain" onClick={handleOpen}>
            Create Group
          </Button>
        </div>
        <div className="group-item-wrraper">
          <div className="group-images"></div>
          <div className="group-names">
            <h5>rony</h5>
          </div>
          <div className="group-list-btn">
            <button type="button">Join</button>
          </div>
        </div>
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
