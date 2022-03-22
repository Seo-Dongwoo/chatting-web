import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "d986877a-bdfd-4605-935e-9e1599a1293a",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        // FormData는 form 필드와 그 값을 나타내는 일련의 key/value 쌍을
        // 쉽게 만들어 낼 수 있는 방법을 제공합니다.

        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        // formdata.append는 FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고,
        // 키가 없으면 추가합니다.

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "939619cc-c1e3-48ac-bfd2-6cc5fdf5c7d8",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Discord</div>
        <div onClick={handleLogout} className="logout-tab">
          로그아웃
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="d986877a-bdfd-4605-935e-9e1599a1293a"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
