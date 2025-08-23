# Application UI

Documentation for the Atlas application's overall structure and layout.

For an all-in-one page wrapper that composes these pieces together, see the [App Layout](app.md) component.

## Table of Contents
- [Navigation](#navigation)
  - [NavTopbar](#navtopbar)
  - [NavSidebar](#navsidebar)
  - [PageSideNav](#pagesidenav)
- [Layout](#layout)
  - [Topbar](#topbar)
  - [PageHeader](#pageheader)
  - [PageContent](#pagecontent)
  - [PageFooter](#pagefooter)

## Navigation
Components that allow users to navigate across or within pages.

### NavTopbar
Global top navigation bar.

```ts
import { NavTopbar } from '@atlas/ui';
```

```vue
<NavTopbar :items="navItems">
  <template #actions>
    <!-- optional action buttons -->
  </template>
</NavTopbar>
```

**Props**
- `items: NavItem[]` – navigation links, supports nested `children`.
- `linkComponent: string | object` – component used for links. Default `'a'`.
- `homeUrl: string` – root link. Default `'/'`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.

**Events**
- None

### NavSidebar
Vertical navigation sidebar.

```ts
import { NavSidebar } from '@atlas/ui';
```

```vue
<NavSidebar :items="navItems">
  <template #actions>
    <!-- footer actions -->
  </template>
</NavSidebar>
```

**Props**
- `items: NavItem[]` – sections and links displayed in the sidebar.
- `homeUrl: string` – root link. Default `'/'`.
- `linkComponent: string | object` – component used for links. Default `'a'`.

**Events**
- None

### PageSideNav
Secondary navigation within a page.

```ts
import { PageSideNav } from '@atlas/ui';
```

```vue
<PageSideNav :items="sideItems" />
```

**Props**
- `items: NavItem[]` – navigation links. Default `[]`.
- `linkComponent: string | object` – component used for links. Default `'a'`.

**NavItem**
- `label: string`
- `href: string`
- `disabled?: boolean` – apply disabled styling and prevent navigation.
- `lockTooltipText?: string` – when `disabled`, show a lock icon on the right with this tooltip.

**Events**
- None

## Layout
Structural components that organize page content and actions.

### Topbar
Simple bar displayed above page content.

```ts
import { Topbar } from '@atlas/ui';
```

```vue
<Topbar>
  <span>Announcements</span>
</Topbar>
```

**Props**
- `pt?: object` – passthrough options for internal elements.

**Slots**
- `default` – bar content.

**Events**
- None

### PageHeader
Page-level header with optional breadcrumbs and tabs.

```ts
import { PageHeader } from '@atlas/ui';
```

```vue
<PageHeader
  :breadcrumbs="[{ href: '/', title: 'Home' }]"
  title="Dashboard"
/>
```

**Props**
- `breadcrumbs: Breadcrumb[]` – items for the breadcrumb trail. Default `[]`.
- `tabs: Tab[]` – optional tab navigation. Default `[]`.
- `title: string` – page title text. Default `''`.
- `linkComponent: string | object` – component used for links. Default `'a'`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.
- `hideTitle: boolean` – hide the title section. Default `false`.

**Events**
- None

### PageContent
Scrollable main content area.

```ts
import { PageContent } from '@atlas/ui';
```

```vue
<PageContent :offset="64">
  <!-- page body -->
</PageContent>
```

**Props**
- `offset: number | null` – top offset for fixed headers. Default `null`.
- `footerHeight: number` – height of a sticky footer to offset. Default `0`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.
- `containerClass: string` – additional container classes. Default `'mx-auto p-4'`.

**Events**
- None

### PageFooter
Sticky footer with optional action slot.

```ts
import { PageFooter } from '@atlas/ui';
```

```vue
<PageFooter>
  <span>&copy; 2024</span>
  <template #action>
    <!-- footer action -->
  </template>
</PageFooter>
```

**Props**
- `leftOffset: number` – offset to account for sidebars. Default `0`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.

**Events**
- None


