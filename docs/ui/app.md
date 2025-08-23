# App Layout

The `App` component composes navigation, page chrome, and page content into a full application layout.

## Table of Contents
- [Side Navigation](#side-navigation)
- [Top Navigation](#top-navigation)
- [Page Header and App Top Bar](#page-header-and-app-top-bar)
- [Page Navigation and Side Content](#page-navigation-and-side-content)
- [Footer](#footer)
- [Slots](#slots)
- [Props](#props)

## Side Navigation
```ts
import { App } from '@atlas/ui';
```

```vue
<App
  :pageUrl="route.path"
  :sideBarItems="sideItems"
>
  <template #navLogo>ACME</template>
  <template #navActions>
    <Button label="Logout" />
  </template>

  <template #default>
    <!-- page content -->
  </template>
</App>
```

## Top Navigation
```vue
<App
  :pageUrl="route.path"
  :topBarItems="topItems"
  :isSideNav="false"
>
  <template #navLogo>ACME</template>
</App>
```

## Page Header and App Top Bar
Use the `appTopBar` slot for a banner above the page and `pageTitle`, `breadcrumbs`, or `headerAction` to customize the header.

```vue
<App
  :pageUrl="route.path"
  pageTitle="Dashboard"
  :breadcrumbs="[{ href: '/', title: 'Home' }]"
>
  <template #appTopBar>
    <div>Welcome back</div>
  </template>

  <template #headerAction>
    <Button label="Edit" />
  </template>
</App>
```

## Page Navigation and Side Content
```vue
<App
  :pageUrl="route.path"
  :pageNavItems="pageNav"
>
  <template #pageSideContent>
    <!-- contextual tools -->
  </template>

  <template #default>
    <!-- page body -->
  </template>
</App>
```

## Footer
```vue
<App :pageUrl="route.path">
  <template #default>
    <!-- page body -->
  </template>

  <template #footer>
    <span>&copy; 2024</span>
  </template>

  <template #footerAction>
    <Button label="Save" />
  </template>
</App>
```

## Slots
- `nav` – replace the navigation area entirely.
- `navLogo` – logo inside default navigation components.
- `navActions` – action area in navigation.
- `appTopBar` – optional bar beneath navigation.
- `headerTitle` – custom page title template.
- `headerAction` – action area in the page header.
- `pageSideContent` – content to the side of the page body.
- `footer` – footer content.
- `footerAction` – action slot in the footer.
- `modals` – render modal components outside the layout.
- `default` – main page content.

## Props
- `pageUrl: string` – current page identifier.
- `isSideNav: boolean` – render side navigation when true; top bar when false. Default `true`.
- `hasToast: boolean` – include global `<Toast>` instance. Default `true`.
- `pageTitle: string` – text title for the page. Default `'Home'`.
- `pageTabs: any[]` – tab definitions for the header. Default `[]`.
- `pageNavItems: any[]` – items for the optional `PageSideNav`. Default `[]`.
- `sideBarItems: any[]` – navigation sections for the side bar. Default `[]`.
- `topBarItems: any[]` – navigation items for the top bar. Default `[]`.
- `linkComponent: string | object` – component used for navigation links. Default `'a'`.
- `breadcrumbs: any[]` – breadcrumb trail for the header. Default `[]`.
- `widthClass: string` – max width container class. Default `'max-w-screen-2xl'`.
- `containerClass: string` – additional classes for the main container. Default `'mx-auto p-4'`.
- `noScroll: boolean` – disable vertical scrolling for the main content. Default `false`.
