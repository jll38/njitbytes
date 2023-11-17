import React from "react";
import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalClose,
  Typography,
  ModalDialog,
  Checkbox,
} from "@mui/joy";
import { Logo } from "../../components/Logo";
import { getFavoriteArr } from "../../utils/userinfo";
import { removeFavorite } from "../../utils/userinfo";
import Layout from "../Layout";

export function FavoriteItemsPage() {
  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");
  const [favorites, setFavorites] = useState(getFavoriteArr());
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isMobile = window.innerWidth <= 600;
  const handleRemove = (item) => {
    removeFavorite(favorites, item, false);
    setFavorites(getFavoriteArr());
  };

  const handleClick = (item) => {
    console.log("test");
    if (confirmDelete) {
      handleRemove(item);
    } else {
      setModalOpen(true);
    }
  };

  const handleModalClose = (item) => {
    if (checked) {
      setConfirmDelete(true);
    }
    setModalOpen(false);
    handleRemove(item);
  };

  return localStorage.getItem("byte_quizStatus") !== null ? (
    <Layout>
      <div
        className={`flex flex-col items-center justify-${
          isMobile ? "center" : "start"
        } mt-${isMobile ? 0 : 10}`}
        style={isMobile ? { marginBottom: "6.48rem" } : {}}
      >
        <Logo />
        <div className="">
          <h2 style={isMobile ? { fontSize: "2rem" } : {}}>
            Favorite Menu Items
          </h2>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((item, i) => {
                return (
                  <li key={i}>
                    <Button
                      variant="text"
                      className="hover:line-through"
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      {item}
                    </Button>
                    <Modal
                      aria-labelledby="modal-title"
                      aria-describedby="modal-desc"
                      open={modalOpen}
                      onClose={() => setModalOpen(false)}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ModalDialog sx={{ maxWidth: "30%" }}>
                        <ModalClose />
                        <Typography sx={{ fontWeight: 600 }}>
                          Confirmation
                        </Typography>
                        <Typography>
                          Are you sure you want to remove{" "}
                          <strong>{item}</strong> from your favorites?
                        </Typography>
                        <div className="flex items-center justify-between">
                          <Checkbox
                            label="Don't ask me again"
                            onChange={() => {
                              setChecked(!confirmDelete);
                            }}
                          />
                          <Button
                            variant="soft"
                            onClick={() => {
                              handleModalClose(item);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </ModalDialog>
                    </Modal>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div style={{ justifyContent: "center" }}>
              <p style={{ fontStyle: "italic", textAlign: "center" }}>
                What a desolate place this is...
                <br />
                Add some items to your favorites!
              </p>
              <img
                src="/images/animated_sushi.webp"
                alt="Dancing Sushi"
                style={{
                  width: "17rem",
                  marginLeft: isMobile ? "1.5rem" : "6.1rem",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <p style={{ fontStyle: "italic" }}>What a desolate place this is...</p>
  );
}
