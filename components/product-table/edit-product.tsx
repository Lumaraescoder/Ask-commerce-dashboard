import { Button, Divider, Input, Modal } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import React, { useState } from 'react';
import {EditIcon} from '../icons/table/edit-icon';
import {IconButton} from './table.styled';
import { Product } from './table';

interface Props {
  product: Product;
}

interface editableProduct {
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
  __v: string;
  _id: string;
}

export const EditProduct = (product: Props) => {

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  let editableProduct: editableProduct = product.product;
  const [changedProduct, setChangedProduct] = useState<editableProduct>({
    _id: editableProduct._id,
    category: '',
    description: '',
    image: '',
    price: '',
    title: '',
    __v: ''
  })
  const handleInputChange  =  async (event: any) => {
    const { name, value } = event.target;

    // Update the state with the new value for the corresponding property
    setChangedProduct({
      ...changedProduct,
      [name]: value,
    });
  };
  
  const handleSubmit = async () => {
    await onChangeEdit(editableProduct._id, changedProduct);
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const onChangeEdit = async (id: any, newData: any) => {
   

    try{
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWQ3YmMxZjllMTk3YzkxZTZkMDk1MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NDYyMzE4NywiZXhwIjoxNjk0NjI2Nzg3fQ.8CaaF4bP8hK1-6DzwPIS_D8PnSujw0Zo8a6Bdt4TOlc';
      const response = await fetch(`http://localhost:3333/products/${changedProduct._id}`,  {
        method: "PUT",
        body: JSON.stringify(
          newData
        ),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message);
      } 
      return data;
      
    } catch(err){
      console.log(err);
    }
  }


  return (
    <div>
        <IconButton auto onClick={handler}>
            <EditIcon size={20} fill="#979797" />
         </IconButton>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
      >
        <Modal.Header css={{ justifyContent: "start" }}>          
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
                label="Title"
                name="title"
                bordered
                clearable
                fullWidth
                size="lg"
                value={editableProduct.title}
                onChange={handleInputChange}
              />
              <Input
                label="Price"
                name="price"
                clearable
                bordered
                fullWidth
                size="lg"
                value={editableProduct.price}
                onChange={handleInputChange}
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
                label="Description"
                name="description"
                clearable
                bordered
                fullWidth
                size="lg"
                value={editableProduct.description}
                onChange={handleInputChange}
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
                label="Category"
                name="category"
                clearable
                bordered
                fullWidth
                size="lg"
                value={editableProduct.category}
                onChange={handleInputChange}
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={() => {closeHandler(); handleSubmit()}}>
            Edit Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
