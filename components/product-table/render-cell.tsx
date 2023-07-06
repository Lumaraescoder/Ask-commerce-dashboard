import { Col, Row, Tooltip } from '@nextui-org/react';
import React from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EyeIcon } from '../icons/table/eye-icon';
import { IconButton } from './table.styled';
import { Product } from './table';
import { EditProducts } from '../../pages/edit-products/[id]';
import useSWR from 'swr';

interface Props {
  product: Product;
  columnKey: string | React.Key;
  onDelete: (productId: string) => void;
}

export const RenderCell = ({ product, columnKey, onDelete }: Props) => {
  const { mutate } = useSWR('products'); // Assuming the SWR key for product data is 'products'

  async function deleteProduct(productId: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully');
        onDelete(productId);
        mutate(); // Update the product data after successful deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const cellValue: keyof Product = product[columnKey];
  console.log(product);

  switch (columnKey) {
    case 'actions':
      if (!product._id) {
        return null; // If _id is undefined, return null or handle the error accordingly
      }

      return (
        <Row justify="center" align="center" css={{ gap: '$8', '@md': { gap: 0 } }}>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log('View product', product._id)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Edit user">
              <IconButton>
                <EditProducts productId={product._id} results={undefined} />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Delete user" color="error">
              <IconButton onClick={() => deleteProduct(product._id)}>
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