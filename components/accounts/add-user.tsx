import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Checkbox,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Flex } from "../styles/flex";
import { mutate } from "swr";

export const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => {
    setVisible(false);
  };

  const openSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleCheckboxChange = () => {
    setAdmin(!admin);
  };

  const handleAddUser = () => {
    if (!username || !firstName || !lastName || !email || !password) {
      setError("Please, fill all fields!");
      openErrorModal();
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      isAdmin: admin,
    };

    fetch("http://localhost:3333/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding user");
        }
        return response.json();
      })
      .then((data) => {
        setResponse(data);
        closeModal();
        mutate("http://localhost:3333/users");
        openSuccessModal();

        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAdmin(false);
      })
      .catch((error) => {
        setError(error.message);
        openErrorModal();
      });
  };

  return (
    <div>
      <Button auto onClick={openModal}>
        Add User
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeModal}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Add new user
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
                bordered
                clearable
                fullWidth
                size="md"
                placeholder="Username"
                color="primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="First Name"
                bordered
                clearable
                fullWidth
                size="md"
                placeholder="First Name"
                color="primary"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                label="Last Name"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Last Name"
                color="primary"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                label="Email"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Email"
                color="primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Password"
                color="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Checkbox
                css={{ mt: "$10" }}
                color="primary"
                size="sm"
                defaultChecked={admin}
                onChange={handleCheckboxChange}
              >
                Admin?
              </Checkbox>
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
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
          <Text>User added successfully!</Text>
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
          <Text>{error}</Text>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
