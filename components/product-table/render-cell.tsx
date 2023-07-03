import {Col, Row,Tooltip} from '@nextui-org/react';
import React from 'react';
import {DeleteIcon} from '../icons/table/delete-icon';
import {EditIcon} from '../icons/table/edit-icon';
import {EyeIcon} from '../icons/table/eye-icon';
import {users} from './data';
import {IconButton} from './table.styled';
import { Product } from './table';

interface Props {
   product: Product;
   columnKey: string | React.Key;
}

export const RenderCell = ({product, columnKey}: Props) => {
   // @ts-ignore
   const cellValue: keyof Product = product[columnKey];
   switch (columnKey) {

      case 'actions':
         return (
            <Row
               justify="center"
               align="center"
               css={{'gap': '$8', '@md': {gap: 0}}}
            >
               <Col css={{d: 'flex'}}>
                  <Tooltip content="Details">
                     <IconButton
                        onClick={() => console.log('View product', product._id)}
                     >
                        <EyeIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{d: 'flex'}}>
                  <Tooltip content="Edit user">
                     <IconButton
                        onClick={() => console.log('Edit product', product._id)}
                     >
                        <EditIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{d: 'flex'}}>
                  <Tooltip
                     content="Delete user"
                     color="error"
                     onClick={() => console.log('Delete product', product._id)}
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
