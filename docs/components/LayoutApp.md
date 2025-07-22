# Layout App Component

The Layout App component serves as the main structural container for application layouts. It provides a consistent framework with various navigation options, header areas, content sections, and footer support.

## Basic Usage

```vue
<template>
    <LayoutApp
        pageUrl="/dashboard"
        :sideBarItems="navigationItems"
    >
        <template #default>
            Your main content goes here
        </template>
    </LayoutApp>
</template>

<script setup>
import { computed } from 'vue';
import { IconDashboard, IconSettings } from '@tabler/icons-vue';

const navigationItems = computed(() => [
    {
        children: [
            { label: 'Dashboard', href: '/dashboard', parent: null, icon: IconDashboard, activeIcon: IconDashboard },
            { label: 'Settings', href: '/settings', parent: null, icon: IconSettings, activeIcon: IconSettings }
        ]
    }
]);
</script>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pageUrl` | String | Yes | - | Current page URL used for navigation highlighting |
| `isSideNav` | Boolean | No | `true` | When true, displays side navigation, otherwise displays top navigation |
| `hasToast` | Boolean | No | `true` | Whether to show the Toast component in the layout |
| `pageTitle` | String | No | 'Home' | Title displayed in the page header |
| `pageTabs` | Array | No | `[]` | Tabs to display in the page header |
| `pageNavItems` | Array | No | `[]` | Navigation items for the page side navigation |
| `sideBarItems` | Array | No | `[]` | Navigation items for the main side navigation |
| `topBarItems` | Array | No | `[]` | Navigation items for the top navigation bar (similar structure to sideBarItems) |
| `linkComponent` | String/Object | No | 'a' | Component to use for navigation links (useful for framework routing) |
| `breadcrumbs` | Array | No | `[]` | Breadcrumbs to display in the page header |
| `widthClass` | String | No | 'max-w-screen-2xl' | CSS class for controlling layout width |
| `containerClass` | String | No | 'mx-auto p-4' | CSS class for the content container |
| `noScroll` | Boolean | No | `false` | When true, disables scrolling in the main content area |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content of the application |
| `nav` | Custom navigation content (replaces default navigation) |
| `navLogo` | Logo content in the navigation bar |
| `navActions` | Action buttons for the navigation bar |
| `appTopBar` | Content for the application top bar |
| `headerTitle` | Custom title content for the page header |
| `headerAction` | Action buttons for the page header |
| `pageSideContent` | Content for the page side panel |
| `footer` | Main content for the page footer |
| `footerAction` | Action buttons for the page footer |
| `modals` | Modal dialogs that should be rendered outside the main layout |

## Navigation Structure

The `sideBarItems` prop accepts arrays with the following structure:

```js
[
    {
        children: [
            { 
                label: 'Dashboard', 
                href: '/dashboard', 
                parent: null, 
                icon: IconDashboard, 
                activeIcon: IconDashboard,
                count: 5 // Optional notification count
            },
            { 
                label: 'Settings', 
                href: '/settings', 
                parent: '/settings', 
                icon: IconSettings, 
                activeIcon: IconSettings 
            }
        ]
    },
    // Additional navigation groups...
]
```

## Page Navigation Structure

The `pageNavItems` prop accepts an array with the following structure:

```js
[
    { 
        label: 'Components', 
        children: [
            { label: 'Forms', href: '/' },
            { label: 'Editor', href: '/components/editor', parent: '/components/editor' }
        ] 
    },
    { 
        label: 'My Account', 
        children: [
            { label: 'Account', href: '/settings/account' },
            { label: 'Security', href: '/settings/security' }
        ] 
    }
    // Additional navigation sections...
]
```

## Page Tabs Structure

The `pageTabs` prop accepts an array with the following structure:

```js
[
    {
        label: 'Overview',
        url: '/project/overview',
        active: true
    },
    {
        label: 'Settings',
        url: '/project/settings'
    }
]
```

## Breadcrumbs Structure

The `breadcrumbs` prop accepts an array with the following structure:

```js
[
    {
        label: 'Home',
        url: '/'
    },
    {
        label: 'Projects',
        url: '/projects'
    },
    {
        label: 'Project Name',
        url: '/projects/123',
        active: true
    }
]
```

## Responsive Behavior

The Layout App component is fully responsive:

- When `isSideNav` is true, it displays a side navigation panel suitable for desktop views
- When `isSideNav` is false, it switches to a top navigation bar better suited for mobile views
- The layout automatically handles resizing events to adjust footer positioning

## Examples

### Basic Layout with Side Navigation

```vue
<LayoutApp
    pageUrl="/dashboard"
    pageTitle="Dashboard"
    :sideBarItems="navigationItems"
>
    <template #navLogo>
        <img src="/logo.svg" alt="Company Logo" class="h-8" />
    </template>

    <template #default>
        <div class="p-4">
            <h1>Welcome to the Dashboard</h1>
            <p>Your content here...</p>
        </div>
    </template>
</LayoutApp>
```

### Layout with Top Navigation and Tabs

```vue
<template>
    <LayoutApp
        pageUrl="/projects/123"
        pageTitle="Project Details"
        :isSideNav="false"
        :topBarItems="topNavItems"
        :pageTabs="projectTabs"
        :breadcrumbs="projectBreadcrumbs"
    >
        <template #headerAction>
            <button class="btn btn-primary">Edit Project</button>
        </template>

        <template #default>
            <div class="p-4">
                <h2>Project Overview</h2>
                <p>Project details here...</p>
            </div>
        </template>

        <template #footer>
            <div class="text-sm text-gray-500">Last updated: July 22, 2025</div>
        </template>
    </LayoutApp>
</template>

<script setup>
import { computed } from 'vue';
import { IconHome, IconProject, IconSettings } from '@tabler/icons-vue';

const topNavItems = computed(() => [
    {
        children: [
            { label: 'Home', href: '/', parent: null, icon: IconHome },
            { label: 'Projects', href: '/projects', parent: '/projects', icon: IconProject },
            { label: 'Settings', href: '/settings', parent: null, icon: IconSettings }
        ]
    }
]);

const projectTabs = [
    { title: 'Overview', href: '/projects/123' },
    { title: 'Settings', href: '/projects/123/settings' }
];

const projectBreadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Projects', url: '/projects' },
    { label: 'Project Details', url: '/projects/123', active: true }
];
</script>
```
