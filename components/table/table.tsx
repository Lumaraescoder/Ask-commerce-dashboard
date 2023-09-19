import { Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../styles/box";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import useSWR, { mutate } from "swr";
import { fetchData } from "./data";

export const TableWrapper = () => {
  const { data: fetchedUsers, error } = useSWR(
    "https://ask-commerce-api.onrender.com/users",
    fetchData
  );

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="multiple"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "TITLE"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body>
          {fetchedUsers &&
            fetchedUsers.map((user: any) => (
              <Table.Row key={user.id}>
                {columns.map((column) => (
                  <Table.Cell key={column.uid}>
                    <RenderCell user={user} columnKey={column.uid} />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={Infinity}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Box>
  );
};
