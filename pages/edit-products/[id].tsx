import { Button, Divider, Input, Modal, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
// import { Flex } from '../styles/flex';
//import { EditIcon } from '../icons/table/edit-icon';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Flex } from '../../components/styles/flex';
import { EditIcon } from '../../components/icons/table/edit-icon';

export interface Product {
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
}

interface EditProductProps {
  productId: string;
  results: any;
}

export async function getInfo(id: any) {

  const response = await fetch(`http://localhost:3000/products/${id}`);
 
  const res = await response.json();
 
 
  const title = res.title;
  const description = res.title;

 
 
  return {
 
  title,
  description
 
  };
 
 }





export const EditProducts: React.FC<EditProductProps> = ({ productId }) => {
  
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const router = useRouter()
  const id = router.query.id
  console.log(title)
  console.log(description)
  useEffect(() => {
    const data  = async ( ) => {
      const res = await  getInfo(id)
      setTitle(res.title);
      setDescription(res.description);
    }
  
    data();

  }, [id])

  
  




  const useProductData = (productId: string) => {
    const url = `http://localhost:3000/products/${productId}`;
    const { data, error } = useSWR<Product>(url);

    console.log("first data", data, "error", error);

    if (error) {
      console.error('Failed to fetch product data:', error);
      return { productData: null, isLoading: false };
    }
    
    const { title, price, description, image, category } = data || {};
    console.log("data ->", data);
    
    return { productData: { title, price, description, image, category }, isLoading: !data };
    
  };


  

  const { productData, isLoading } = useProductData(productId);

  const [editedTitle, setEditedTitle] = useState<string>(productData?.title || '');
  const [editedPrice, setEditedPrice] = useState<string>(productData?.price || '');
  const [editedDescription, setEditedDescription] = useState<string>(productData?.description || '');
  const [editedImage, setEditedImage] = useState<string>(productData?.image || '');
  const [editedCategory, setEditedCategory] = useState<string>(productData?.category || '');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedTitle(event.target.value);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedPrice(event.target.value);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedDescription(event.target.value);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedImage(event.target.value);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedCategory(event.target.value);

  const handler = () => setVisible(true);
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  return (
    <div>
      <EditIcon size={20} fill="#979797" auto onClick={handler} />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: 'start' }}>
          <Text id="modal-title" h4>
            Edit Product
          </Text>
        </Modal.Header>
        <Divider css={{ my: '$5' }} />
        <Modal.Body css={{ py: '$10' }}>
          <Flex
            direction={'column'}
            css={{
              'flexWrap': 'wrap',
              'gap': '$8',
              '@lg': { flexWrap: 'nowrap', gap: '$12' },
            }}
          >
            <Flex
              css={{
                'gap': '$10',
                'flexWrap': 'wrap',
                '@lg': { flexWrap: 'nowrap' },
              }}
            >
              <Input
                label="Title"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Title"
                value={editedTitle}
                onChange={handleTitleChange}
              />
              <Input
                label="Price"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Price"
                value={editedPrice}
                onChange={handlePriceChange}
              />
            </Flex>

            <Flex
              css={{
                'gap': '$10',
                'flexWrap': 'wrap',
                '@lg': { flexWrap: 'nowrap' },
              }}
            >
              <Input
                label="Description"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Description"
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
              <Input
                label="Image"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Image"
                value={editedImage}
                onChange={handleImageChange}
              />
            </Flex>
            <Flex
              css={{
                'gap': '$10',
                'flexWrap': 'wrap',
                '@lg': { flexWrap: 'nowrap' },
              }}
            >
              <Input
                label="Category"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Ex: Electronics, Books, Clothing, Other"
                value={editedCategory}
                onChange={handleCategoryChange}
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: '$5' }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
