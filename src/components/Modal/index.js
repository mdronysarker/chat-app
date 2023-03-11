import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./style.css";

const Popup = ({ open, setOpen }) => {
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          // onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box className="box_modal">
              Text in a modal Duis mollis, est non commodo luctus, nisi erat
              porttitor ligula.
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Popup;
