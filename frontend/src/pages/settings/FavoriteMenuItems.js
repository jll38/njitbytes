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

export function FavoriteItemsPage() {
  if (localStorage.getItem("byte_quizStatus") === null)
    window.location.assign("/");
  const [favorites, setFavorites] = useState(getFavoriteArr());
  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Logo />
      <div className="mt-[8rem]">
        <h2>Favorite Menu Items</h2>
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
                      Are you sure you want to remove <strong>{item}</strong>{" "}
                      from your favorites?
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
      </div>
    </div>
  ) : (
    <></>
  );
}
