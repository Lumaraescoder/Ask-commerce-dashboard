import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IconButton, StyledBadge } from "./table.styled";

interface Props {
  user: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];

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
              onClick={() => console.log("Delete user", user.id)}
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
