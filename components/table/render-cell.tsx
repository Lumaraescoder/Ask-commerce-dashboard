import {
  Col,
  Row,
  User,
  Text,
  Tooltip,
  Modal,
  Divider,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IconButton, StyledBadge } from "./table.styled";
import { mutate } from "swr";

interface Props {
  user: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3333/users/${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessModalVisible(true);
        setTimeout(() => {
          mutate("http://localhost:3333/users");
        }, 1500);
      } else {
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorModalVisible(true);
    }
  };

  switch (columnKey) {
    case "username":
      return (
        <Col>
          <Row>
            <Text b size={13} css={{ tt: "uppercase" }}>
              {cellValue}
            </Text>
          </Row>
        </Col>
      );
    case "email":
      return (
        <Col>
          <Row>
            <Text b size={13} css={{ tt: "uppercase" }}>
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
          <Modal
            closeButton
            aria-labelledby="modal-title"
            width="400px"
            open={successModalVisible}
            onClose={closeSuccessModal}
          >
            <Modal.Header css={{ justifyContent: "start" }}>
              <Text id="modal-title" h4>
                Success
              </Text>
            </Modal.Header>
            <Divider css={{ my: "$5" }} />
            <Modal.Body>
              <Text>User deleted successfully!</Text>
            </Modal.Body>
            <Divider css={{ my: "$5" }} />
            <Modal.Footer>
              <Button auto onClick={closeSuccessModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            closeButton
            aria-labelledby="modal-title"
            width="400px"
            open={errorModalVisible}
            onClose={closeErrorModal}
          >
            <Modal.Header css={{ justifyContent: "start" }}>
              <Text id="modal-title" h4>
                Error
              </Text>
            </Modal.Header>
            <Divider css={{ my: "$5" }} />
            <Modal.Body>
              <Text>An error occurred while deleting the user.</Text>
            </Modal.Body>
            <Divider css={{ my: "$5" }} />
            <Modal.Footer>
              <Button auto onClick={closeErrorModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => console.log("Edit user", user.id)}>
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
        </Row>
      );
    default:
      return cellValue;
  }
};
