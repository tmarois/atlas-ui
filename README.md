# Atlas

## useModal

```js
const { openModal, closeModal, modal, modalProps } = useModal()

const isModal = modal('modal-key')

// open and close based on reactive bool
isModal.value = true // or false

// open and set props for global state
openModal('modal-key', { name: 'Custom Name' })

// closeModal() can be used anywhere to close the modal

// access the modalProps 
modalProps.value.name

```
