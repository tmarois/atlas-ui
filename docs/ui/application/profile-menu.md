# ProfileMenu

User avatar dropdown menu for account actions.

## Example
```ts
import { ProfileMenu } from '@atlas/ui';
```

```vue
<ProfileMenu
  :user="user"
  :items="profileMenuItems"
  :avatar-only="true"
  headerLink="/"
  :linkComponent="RouterLink"
/>
```

## Props
- `avatarOnly: boolean` – render only the avatar as trigger. Default `false`.
- `user: object` – user data containing `id`, `name`, and `email`.
- `items: any[]` – menu item definitions.
- `headerLink: string | null` – link for the header when `avatarOnly` is true. Default `null`.
- `linkComponent: string | object` – component used for internal links. Default `'a'`.

## Slots
- `trigger` – custom trigger element. Slot props: `{ user, toggle }`.
- `avatarMenuHeader` – content above menu items when `avatarOnly` is true.

## Events
- None
