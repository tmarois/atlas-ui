# Atlas

## useModal

```js
const { open, modal, modalProps } = useModal()

const isModal = modal('modal-key')

// open and close based on reactive bool
isModal.value = true // or false

// open and set props for global state
open('modal-key', { name: 'Custom Name' })

// access the modalProps 
modalProps.value.name

```


## usePageProp

```js
// computed reactive user from inertia page props
const user = usePageProp('user')

// dot notation if you need to access deep variables
const userName = usePageProp('user.name')

```

