import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import "./style.css";
import { useSelector } from "react-redux";
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";

const Userlists = () => {
  const [usersList, setUsersList] = useState([]);
  const [friendreq, setFriendreq] = useState([]);
  const [cancelreq, setCancelreq] = useState([]);
  const [friend, setFriend] = useState([]);
  const [blockList, setBlockList] = useState([]);

  const user = useSelector((users) => users.login.loggedIn);
  // console.log(user);

  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      const userArr = [];
      snapshot.forEach((userlist) => {
        if (user.uid !== userlist.key) {
          getDownloadURL(Ref(storage, userlist.key))
            .then((url) => {
              userArr.push({
                ...userlist.val(),
                id: userlist.key,
                profilePicture: url,
              });
            })
            .catch((error) => {
              userArr.push({
                ...userlist.val(),
                id: userlist.key,
                profilePicture: null,
              });
            })
            .then(() => {
              setUsersList([...userArr]);
            });
        }
      });
    });
  }, [user.uid, db, storage]);

  // Sent Request
  const handleSentRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: item.username,
      reciverid: item.id,
    });
  };

  // Show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push(item.val().reciverid + item.val().senderid);
      });
      setFriendreq(reqarr);
    });
  }, [db]);

  // Show friend
  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((friend) => {
        friendArr.push(friend.val().reciverid + friend.val().senderid);
      });
      setFriend(friendArr);
    });
  }, [db]);

  // Block
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((block) => {
        blockArr.push(block.val().BlockId + block.val().BlockById);
      });
      setBlockList(blockArr);
    });
  }, [db]);

  // console.log(blockList);

  // cancel
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push({ ...item.val(), id: item.key });
      });

      setCancelreq(reqarr);
    });
  }, [db]);

  // Cancel req
  const handleCancel = (id) => {
    remove(ref(db, "friendrequest/" + id));
    // console.log(id);
  };

  return (
    <>
      <div className="userlists">
        <div className="userlists_header">
          <h4>User List</h4>
        </div>
        {usersList.map((item, i) => (
          <div key={i} className="userlists-wrraper">
            <div className="userlists-images">
              <picture>
                <img
                  src={item.profilePicture || "./images/profile-pic.jpg"}
                  onError={(e) => {
                    e.target.src = "./images/profile-pic.jpg";
                  }}
                  alt=""
                />
              </picture>
            </div>
            <div className="userlists-names">
              <h5>{item.username}</h5>
            </div>
            <div className="userlists-btn" key={i}>
              {blockList.includes(item.id + user.uid) ||
              blockList.includes(user.uid + item.id) ? (
                <button>Block</button>
              ) : friend.includes(item.id + user.uid) ||
                friend.includes(user.uid + item.id) ? (
                <button ype="button"> Friend</button>
              ) : friendreq.includes(item.id + user.uid) ||
                friendreq.includes(user.uid + item.id) ? (
                <button
                  type="button"
                  onClick={() =>
                    handleCancel(
                      cancelreq.find(
                        (req) =>
                          req.reciverid === item.id && req.senderid === user.uid
                      ).id
                    )
                  }
                >
                  Cancel Requset
                </button>
              ) : (
                <button type="button" onClick={() => handleSentRequest(item)}>
                  Sent Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Userlists;
