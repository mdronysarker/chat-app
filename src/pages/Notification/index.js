import React, { useEffect, useState } from "react";
import "./style.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

export const Notification = () => {
  const [notification, setNotification] = useState([]);

  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "notification");
    onValue(starCountRef, (snapshot) => {
      const notificationArr = [];
      snapshot.forEach((item) => {
        if (item.val().Id === user.uid) {
          notificationArr.push(item.val());
        }
      });
      setNotification(notificationArr);
    });
  }, [db, user.uid]);

  // console.log(notification);

  return (
    <>
      <div className="notification-box">
        <div className="notification-wrapper">
          {notification.map((item, i) => (
            <div className="notification-item" key={i}>
              <div className="notification-icon">
                <NotificationsNoneIcon />
              </div>
              <div className="notification-text">
                <p>{item.notification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
