import React from "react";
import { Icon } from "antd";
import { AiFillLinkedin, AiTwotoneHeart, AiFillGithub } from "react-icons/ai";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        Made By Sib Raza With <AiTwotoneHeart style={{ color: "red" }} />
      </p>
      <span>
        <a href="https://www.linkedin.com/in/sibraza/">
          <AiFillLinkedin style={{ fontSize: "24px", color: "blue" }} />
        </a>
        <a href="https://github.com/sibraza15">
          <AiFillGithub style={{ fontSize: "24px", color: "black" }} />
        </a>
      </span>
    </div>
  );
}

export default Footer;
