import { Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../styles/box";
import { columns, users } from "./data";
import { RenderCell } from "./render-cell";
import useSWR from "swr";

const getAllProducts = (url: string) => fetch(url).then((res) => res.json());

export interface Product {
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
  __v: string;
  _id: string;
}

export const TableWrapper = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, error } = useSWR<Product[]>(
    "http://localhost:3333/products",
    getAllProducts
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

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
        {
          <Table.Body items={products}>
            {(product) => (
              <Table.Row key={`${product._id}_row`}>
                {(columnKey) => (
                  <Table.Cell>
                    {RenderCell({ product, columnKey: columnKey })}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        }
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Box>
  );
};
