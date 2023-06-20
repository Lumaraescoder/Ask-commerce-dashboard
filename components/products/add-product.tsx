import {Button, Divider, Dropdown, Input, Modal, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';

export const AddUser = () => {
   const [visible, setVisible] = React.useState(false);
   const handler = () => setVisible(true);

   const closeHandler = () => {
      setVisible(false);
      console.log('closed');
   };

   return (
      <div>
         <Button auto onClick={handler}>
            Add Product
         </Button>
         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header css={{justifyContent: 'start'}}>
               <Text id="modal-title" h4>
                  Add new product
               </Text>
            </Modal.Header>
            <Divider css={{my: '$5'}} />
            <Modal.Body css={{py: '$10'}}>
               <Flex
                  direction={'column'}
                  css={{
                     'flexWrap': 'wrap',
                     'gap': '$8',
                     '@lg': {flexWrap: 'nowrap', gap: '$12'},
                  }}
               >
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
                     }}
                  >
                     <Input
                        label="Title"
                        bordered
                        clearable
                        fullWidth
                        size="lg"
                        placeholder="Title"
                     />
                     <Input
                        label="Price"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Price"
                     />
                  </Flex>

                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
                     }}
                  >
                     <Input
                        label="Description"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Description"
                     />
                     <Input
                        label="Image"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Image"
                     />
                  </Flex>
                  <Flex
                     css={{
                        'gap': '$10',
                        'flexWrap': 'wrap',
                        '@lg': {flexWrap: 'nowrap'},
                     }}
                  >
                     <Input
                        label="Category"
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        placeholder="Ex: Eletronics, Books, Clothing, Other"
                     />
                  </Flex>
               </Flex>
            </Modal.Body>
            <Divider css={{my: '$5'}} />
            <Modal.Footer>
               <Button auto onClick={closeHandler}>
                  Add Product
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};
