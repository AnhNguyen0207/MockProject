import "../styles/Header.css";
import { Avatar, Tag } from "antd";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { ROLE_COLOR } from "../constant";
import { IRoleLable } from "../interface";

export default function HeaderMenu() {
  const currentUser = useSelector((state: RootState) => state.user);
  const title = useSelector((state: RootState) => state.title);

  return (
    <div className="top-header-menu flex justify-between h-full">
        <h2
            style={{
                fontSize: "20px",
                margin: 0,
            }}
            className="self-center"
        >
            {title}
        </h2>

      <div className="user-box">
        <Avatar size="large" src={`${currentUser?.image}`}>
          {currentUser?.username}
        </Avatar>
        <div>
          <div>{currentUser?.username}</div>
          <div>
            <Tag
              style={{
                scale: "0.75",
                transform: "translateX(-7px)",
              }}
              color={ROLE_COLOR[currentUser?.authorities[0] as keyof IRoleLable]}
            >
              {currentUser?.authorities[0]}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
}
