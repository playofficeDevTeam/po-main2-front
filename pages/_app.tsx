import "../styles/globals.css";
import "../styles/tailwind.css";
import "../styles/table.css";

import type { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import CookieConsent from "react-cookie-consent";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cookiePolicy, setCookiePolicy] = useState("");

  useEffect(() => {
    fetch("/cookie-policy.txt")
      .then((response) => response.text())
      .then((text) => setCookiePolicy(text));
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <CookieConsent
        location="bottom"
        buttonText="동의함"
        cookieName="myAwesomeCookieName"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          color: "#4e503b",
          fontSize: "13px",
          marginRight: "110px",
        }}
        expires={150}
      >
        이 사이트는 사용자 경험을 향상시키기 위해 쿠키를 사용합니다.{" "}
        <span
          style={{ fontSize: "10px", cursor: "pointer" }}
          onClick={handleOpen}
        >
          더 알아보기
        </span>
      </CookieConsent>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            wordWrap: "break-word",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            paddingRight: "0px",
            borderRadius: "10px",
            maxHeight: "80vh", // 최대 세로 높이를 전체 뷰포트 높이의 80%로 설정
            overflowY: "hidden", // 전체 Box에서는 스크롤을 제거
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "calc(80vh - 48px)",
              paddingRight: 4,
            }}
          >
            {" "}
            {/* 스크롤 영역 추가 */}
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {cookiePolicy}
            </pre>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default MyApp;
