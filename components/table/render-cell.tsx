import {
  Col,
  Row,
  User,
  Text,
  Tooltip,
  Modal,
  Divider,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IconButton, StyledBadge } from "./table.styled";
import { mutate } from "swr";
import { Flex } from "../styles/flex";

interface Props {
  user: any;
  columnKey: string | React.Key;
}

interface EditedUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface ModalData {
  visible: boolean;
  success: boolean;
  title: string;
  content: string;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];

  const [modals, setModals] = useState<{
    [key: string]: ModalData;
  }>({
    success: {
      visible: false,
      success: true,
      title: "Success",
      content: "User deleted successfully!",
    },
    error: {
      visible: false,
      success: false,
      title: "Error",
      content: "An error occurred while deleting the user.",
    },
    successEdit: {
      visible: false,
      success: true,
      title: "Success",
      content: "User edited!",
    },
    errorEdit: {
      visible: false,
      success: false,
      title: "Error",
      content: "Error editing user!",
    },
  });

  const [editedUser, setEditedUser] = useState<EditedUser>({
    ...user,
  });

  const closeModal = (modalKey: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: {
        ...prevModals[modalKey],
        visible: false,
      },
    }));
  };

  const openModal = (modalKey: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: {
        ...prevModals[modalKey],
        visible: true,
      },
    }));
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`https://ask-commerce-api.onrender.com//users/${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        openModal("success");
        setTimeout(() => {
          mutate("https://ask-commerce-api.onrender.com/users");
        }, 1500);
      } else {
        openModal("error");
      }
    } catch (error) {
      openModal("error");
    }
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch(
        `https://ask-commerce-api.onrender.com//users/${editedUser._id}`,
        {
          method: "PUT",
          body: JSON.stringify(editedUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        closeModal("edit");
        openModal("successEdit");
        mutate("https://ask-commerce-api.onrender.com/users");
      } else {
        openModal("errorEdit");
      }
    } catch (error) {
      openModal("errorEdit");
    }
  };

  switch (columnKey) {
    case "username":
    case "email":
      return (
        <Col>
          <Row>
            <Text b size={13} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
          </Row>
        </Col>
      );
    case "isAdmin":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue ? "Admin" : "Not admin"}
            </Text>
          </Row>
        </Col>
      );
    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          {Object.entries(modals).map(([key, modal]) => (
            <Modal
              closeButton
              aria-labelledby="modal-title"
              width="400px"
              open={modal?.visible || false}
              onClose={() => closeModal(key)}
              key={key}
            >
              <Modal.Header css={{ justifyContent: "start" }}>
                <Text id="modal-title" h4>
                  {modal.title}
                </Text>
              </Modal.Header>
              <Divider css={{ my: "$5" }} />
              <Modal.Body>
                <Text>{modal.content}</Text>
              </Modal.Body>
              <Divider css={{ my: "$5" }} />
              <Modal.Footer>
                <Button auto onClick={() => closeModal(key)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          ))}

          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => openModal("edit")}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={handleDeleteUser}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={modals.edit?.visible || false}
            onClose={() => closeModal("edit")}
          >
            <Modal.Header css={{ justifyContent: "start" }}>
              <Text id="modal-title" h4>
                Edit User
              </Text>
            </Modal.Header>
            <Divider css={{ my: "$5" }} />
            <Modal.Body css={{ py: "$10" }}>
              <Flex
                direction={"column"}
                css={{
                  flexWrap: "wrap",
                  gap: "$8",
                  "@lg": { flexWrap: "nowrap", gap: "$12" },
                }}
              >
                <Flex
                  css={{
                    gap: "$10",
                    flexWrap: "wrap",
                    "@lg": { flexWrap: "nowrap" },
                  }}
                >
                  <Input
                    label="Username"
                    value={editedUser.username}
                    color="primary"
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        username: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="First name"
                    value={editedUser.firstName}
                    color="primary"
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Flex>
                <Flex
                  css={{
                    gap: "$10",
                    flexWrap: "wrap",
                    "@lg": { flexWrap: "nowrap" },
                  }}
                >
                  <Input
                    label="Last name"
                    value={editedUser.lastName}
                    color="primary"
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        lastName: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Email"
                    value={editedUser.email}
                    color="primary"
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                  />
                </Flex>
                <Flex
                  css={{
                    gap: "$10",
                    flexWrap: "wrap",
                    "@lg": { flexWrap: "nowrap" },
                  }}
                >
                  <Input.Password
                    label="Password"
                    color="primary"
                    type="password"
                    value={editedUser.password}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        password: e.target.value,
                      })
                    }
                  />
                  <Checkbox
                    css={{ mt: "$10" }}
                    color="primary"
                    size="sm"
                    defaultSelected={editedUser.isAdmin}
                    onChange={(value) =>
                      setEditedUser({
                        ...editedUser,
                        isAdmin: value,
                      })
                    }
                  >
                    Admin
                  </Checkbox>
                </Flex>
              </Flex>
            </Modal.Body>
            <Divider css={{ my: "$5" }} />
            <Modal.Footer>
              <Button auto onClick={() => closeModal("edit")}>
                Close
              </Button>
              <Button auto color="primary" onClick={handleSaveUser}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      );
    default:
      return cellValue;
  }
};
