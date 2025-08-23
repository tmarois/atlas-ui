# Atlas UI

Reusable Vue 3 components styled with Tailwind CSS and built on top of PrimeVue.

## Table of Contents
- [Application](#application)
- [Override Themes with Passthrough](#override-themes-with-passthrough)
- [Components](#components)
  - [Actions](#actions)
    - [Button](#button)
    - [ButtonGroup](#buttongroup)
  - [Form Elements](#form-elements)
    - [InputText](#inputtext)
    - [InputNumber](#inputnumber)
    - [InputMask](#inputmask)
    - [InputGroup](#inputgroup)
    - [InputOtp](#inputotp)
    - [DatePicker](#datepicker)
    - [Select](#select)
    - [AutoComplete](#autocomplete)
    - [MultiSelect](#multiselect)
    - [Textarea](#textarea)
    - [Checkbox](#checkbox)
    - [RadioButton](#radiobutton)
    - [LabelField](#labelfield)
    - [LabelCheckbox](#labelcheckbox)
    - [LabelRadioButton](#labelradiobutton)
    - [ToggleButton](#togglebutton)
    - [ToggleSwitch](#toggleswitch)
    - [Password](#password)
    - [Slider](#slider)
    - [Editor](#editor)
  - [Layout](#layout)
    - [ScrollFrame](#scrollframe)
    - [Accordion](#accordion)
    - [Card](#card)
    - [Divider](#divider)
    - [Dialog](#dialog)
    - [Drawer](#drawer)
    - [DrawerForm](#drawerform)
    - [Popover](#popover)
    - [Tabs](#tabs)
  - [Data Display](#data-display)
    - [DataTable](#datatable)
    - [Avatar](#avatar)
    - [AvatarGroup](#avatargroup)
    - [Chip](#chip)
    - [Badge](#badge)
    - [TooltipIcon](#tooltipicon)
    - [TooltipInfo](#tooltipinfo)
  - [Navigation](#navigation)
    - [ButtonMenu](#buttonmenu)
    - [Menu](#menu)
    - [Paginator](#paginator)
    - [Pagination](#pagination)
  - [Feedback](#feedback)
    - [Alert](#alert)
    - [Errors](#errors)
    - [Toast](#toast)
    - [ProgressBar](#progressbar)

## Override Themes with Passthrough

PrimeVue components support a [passthrough (pt) API](https://primevue.org/passthrough/) that lets you customize internal elements and classes. Atlas forwards this API so you can tweak component styles or structure when needed.

### Example: Button

```vue
<Button
  label="Submit"
  :pt="{
    root: { class: 'bg-emerald-600 hover:bg-emerald-700 border-none' },
    label: { class: 'text-white font-medium' }
  }"
/>
```

## Application

See the [Application UI guide](ui/application.md) for the app's page structure and layout and the [App Layout](ui/app.md) component for a ready-to-use page wrapper.

## Components

### Actions

#### Button
```ts
import { Button } from '@atlas/ui';
```

```vue
<Button>Click me</Button>
```

##### API

Refer to the [PrimeVue Button API](https://primevue.org/button/#api) for available props and events.

#### ButtonGroup
```ts
import { ButtonGroup, Button } from '@atlas/ui';
```

```vue
<ButtonGroup>
  <Button label="Save" />
  <Button label="Cancel" />
</ButtonGroup>
```

##### API

Refer to the [PrimeVue ButtonGroup API](https://primevue.org/buttongroup/#api).

### Form Elements

#### InputText
```ts
import { InputText } from '@atlas/ui';
```

```vue
<InputText v-model="value" />
```

##### API

See the [PrimeVue InputText API](https://primevue.org/inputtext/#api).

#### InputNumber
```ts
import { InputNumber } from '@atlas/ui';
```

```vue
<InputNumber v-model="value" />
```

##### API

See the [PrimeVue InputNumber API](https://primevue.org/inputnumber/#api).

#### InputMask
```ts
import { InputMask } from '@atlas/ui';
```

```vue
<InputMask mask="99/99/9999" v-model="value" />
```

##### API

Refer to the [PrimeVue InputMask API](https://primevue.org/inputmask/#api).

#### InputGroup
```ts
import { InputGroup, InputText, Button } from '@atlas/ui';
```

```vue
<InputGroup>
  <InputText v-model="value" />
  <Button label="Search" />
</InputGroup>
```

##### API

Refer to the [PrimeVue InputGroup API](https://primevue.org/inputgroup/#api).

#### InputOtp
```ts
import { InputOtp } from '@atlas/ui';
```

```vue
<InputOtp v-model="code" />
```

##### API

Refer to the [PrimeVue InputOtp API](https://primevue.org/inputotp/#api).

#### DatePicker
```ts
import { DatePicker } from '@atlas/ui';
```

```vue
<DatePicker v-model="date" />
```

##### API

See the [PrimeVue DatePicker API](https://primevue.org/datepicker/#api).

#### Select
```ts
import { Select } from '@atlas/ui';
```

```vue
<Select :options="options" v-model="selected" />
```

##### API

See the [PrimeVue Select API](https://primevue.org/select/#api).

#### AutoComplete
```ts
import { AutoComplete } from '@atlas/ui';
```

```vue
<AutoComplete v-model="value" :suggestions="items" />
```

##### API

See the [PrimeVue AutoComplete API](https://primevue.org/autocomplete/#api).

#### MultiSelect
```ts
import { MultiSelect } from '@atlas/ui';
```

```vue
<MultiSelect v-model="selected" :options="options" optionLabel="name" optionValue="value" />
```

##### API

Refer to the [PrimeVue MultiSelect API](https://primevue.org/multiselect/#api).

#### Textarea
```ts
import { Textarea } from '@atlas/ui';
```

```vue
<Textarea v-model="value" />
```

##### API

Refer to the [PrimeVue Textarea API](https://primevue.org/textarea/#api).

#### Checkbox
```ts
import { Checkbox } from '@atlas/ui';
```

```vue
<Checkbox v-model="checked" />
```

##### API

See the [PrimeVue Checkbox API](https://primevue.org/checkbox/#api).

#### RadioButton
```ts
import { RadioButton } from '@atlas/ui';
```

```vue
<RadioButton v-model="selected" :value="'a'" name="group" />
```

##### API

Refer to the [PrimeVue RadioButton API](https://primevue.org/radiobutton/#api).

#### LabelField
```ts
import { LabelField, InputText } from '@atlas/ui';
```

```vue
<LabelField label="Name" name="name" required tooltip="Enter full name">
  <InputText v-model="name" />
</LabelField>
```

##### Props

- `label` – text for the label.
- `tooltip` – help text shown in a tooltip.
- `name` – associates the label with an input.
- `required` – display an asterisk when true.
- `error` – validation message displayed below the field.

#### LabelCheckbox
```ts
import { LabelCheckbox } from '@atlas/ui';
```

```vue
<LabelCheckbox v-model="checked" label="Accept terms" inputId="accept" binary />
```

See the [PrimeVue Checkbox](https://primevue.org/checkbox/) for all available options.

##### API

Refer to the [PrimeVue Checkbox API](https://primevue.org/checkbox/#api).

#### LabelRadioButton
```ts
import { LabelRadioButton } from '@atlas/ui';
```

```vue
<LabelRadioButton
  v-model="selected"
  :value="'a'"
  label="Option A"
  name="options"
  inputId="option-a"
/>
```

See the [PrimeVue RadioButton](https://primevue.org/radiobutton/) for all available options.

##### API

Refer to the [PrimeVue RadioButton API](https://primevue.org/radiobutton/#api).

#### ToggleButton
```ts
import { ToggleButton } from '@atlas/ui';
```

```vue
<ToggleButton v-model="checked" />
```

##### API

Refer to the [PrimeVue ToggleButton API](https://primevue.org/togglebutton/#api).

#### ToggleSwitch
```ts
import { ToggleSwitch } from '@atlas/ui';
```

```vue
<ToggleSwitch v-model="checked" />
```

##### API

Refer to the [PrimeVue ToggleSwitch API](https://primevue.org/toggleswitch/#api).
#### Password
```ts
import { Password } from '@atlas/ui';
```

```vue
<Password v-model="value" />
```

##### API

See the [PrimeVue Password API](https://primevue.org/password/#api).

#### Slider
```ts
import { Slider } from '@atlas/ui';
```

```vue
<Slider v-model="value" />
```

##### API

See the [PrimeVue Slider API](https://primevue.org/slider/#api).

#### Editor

See the [Editor guide](ui/editor.md) for dependencies and usage.


```ts
import { Editor } from '@atlas/ui';
```

```vue
<Editor v-model="content" placeholder="Write something..." />
```

##### Props

- `modelValue` – bound editor content.
- `placeholder` – placeholder text.
- `editorClass` – additional classes for the editor area.
- `autofocus` – focus editor on mount.
- `toolbar` – show the formatting toolbar.
- `toolbarOptions` – array of toolbar buttons to display.
- `textOnly` – restrict to plain text input.
- `toolbarClass` – additional classes for the toolbar.

### Layout

#### ScrollFrame
```ts
import { ScrollFrame } from '@atlas/ui';
```

```vue
<ScrollFrame
  page
  scroll-key="settings"
  :add-offset="16"
  class="p-4"
>
  <!-- scrollable content -->
</ScrollFrame>
```

Provides a scrollable container sized to the viewport. When `page` is set it locks body scrolling and uses `scroll-key` to preserve position.

##### Props

- `scrollKey` (string | null) – identifier used by the scroll composable to persist position. Defaults to `null`.
- `page` (boolean) – lock body scroll and treat the frame as a full page. Defaults to `false`.
- `allowBodyScroll` (boolean) – allow body scroll even when `page` is `true`. Defaults to `false`.
- `offset` (number | null) – explicit pixel offset for height calculation. Defaults to element top position.
- `addOffset` (number) – extra pixels subtracted from height. Defaults to `0`.
- `rootClass` (string) – additional classes for the frame element. Defaults to `overflow-y-auto`.

#### Accordion
```ts
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from '@atlas/ui';
```

```vue
<Accordion>
  <AccordionPanel value="0">
    <AccordionHeader>Header</AccordionHeader>
    <AccordionContent>Content</AccordionContent>
  </AccordionPanel>
</Accordion>
```

##### API

Refer to the [PrimeVue Accordion API](https://primevue.org/accordion/#api).

#### Card
```ts
import { Card } from '@atlas/ui';
```

```vue
<Card title="Title">Content</Card>
```

##### Props

- `noPadding` – removes padding from the card's content section.

##### API

Refer to the [PrimeVue Card API](https://primevue.org/card/#api).

#### Divider
```ts
import { Divider } from '@atlas/ui';
```

```vue
<Divider />
```

##### API

Refer to the [PrimeVue Divider API](https://primevue.org/divider/#api).

#### Dialog
```ts
import { Dialog, Button } from '@atlas/ui';
```

```vue
<Dialog v-model:visible="visible">
  Content
  <template #footer>
    <Button label="Close" @click="visible = false" />
  </template>
</Dialog>
```

##### API

Refer to the [PrimeVue Dialog API](https://primevue.org/dialog/#api).

#### Drawer
```ts
import { Drawer } from '@atlas/ui';
```

```vue
<Drawer v-model:visible="visible">
  Content
</Drawer>
```

##### API

Refer to the [PrimeVue Drawer API](https://primevue.org/drawer/#api).

#### DrawerForm
```ts
import { DrawerForm } from '@atlas/ui';
```

```vue
<DrawerForm v-model="open" title="Title" @submit="save">
  <!-- form fields -->
</DrawerForm>
```

##### Props

- `modelValue` – controls visibility.
- `title` – header text.
- `loading` – shows loading state on save.
- `width` – optional width of drawer.
- `errors` – form error object.
- `tabs` – array of tab definitions.
  - `title: string`
  - `disabled?: boolean`
  - `lockTooltipText?: string` – when `disabled`, display a lock icon with this tooltip.
- `modelActiveTab` – active tab index.

##### Events

- `update:modelValue` – emitted when visibility changes.
- `submit` – emitted on save.
- `update:modelActiveTab` – emitted when active tab changes.

#### Popover
```ts
import { Popover, Button } from '@atlas/ui';
```

```vue
<Popover ref="popover">
  <template #content>More info</template>
</Popover>
<Button label="Show" @click="popover.toggle($event)" />
```

##### API

Refer to the [PrimeVue Popover API](https://primevue.org/popover/#api).

#### Tabs
```ts
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@atlas/ui';
```

```vue
<Tabs value="0">
  <TabList>
    <Tab value="0">One</Tab>
    <Tab value="1">Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="0">Content 1</TabPanel>
    <TabPanel value="1">Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

##### API

Refer to the [PrimeVue Tabs API](https://primevue.org/tabs/#api).

### Data Display

#### DataTable
```ts
import { DataTable } from '@atlas/ui';
import Column from 'primevue/column';
```

```vue
<DataTable :value="rows">
  <Column field="name" header="Name" />
  <Column field="email" header="Email" />
</DataTable>
```

##### API

Refer to the [PrimeVue DataTable API](https://primevue.org/datatable/#api).
See the [Table guide](ui/table.md) for column definitions, pagination, and CSV export.

#### Avatar
```ts
import { Avatar } from '@atlas/ui';
```

```vue
<Avatar label="AB" />
```

##### API

Refer to the [PrimeVue Avatar API](https://primevue.org/avatar/#api).

#### AvatarGroup
```ts
import { AvatarGroup, Avatar } from '@atlas/ui';
```

```vue
<AvatarGroup>
  <Avatar label="AB" />
  <Avatar label="CD" />
</AvatarGroup>
```

##### API

Refer to the [PrimeVue AvatarGroup API](https://primevue.org/avatargroup/#api).

#### Chip
```ts
import { Chip } from '@atlas/ui';
```

```vue
<Chip label="Label" />
```

##### API

Refer to the [PrimeVue Chip API](https://primevue.org/chip/#api).

#### Badge
```ts
import { Badge } from '@atlas/ui';
```

```vue
<Badge value="2" />
```

##### API

Refer to the [PrimeVue Badge API](https://primevue.org/badge/#api).

#### TooltipIcon
```ts
import { TooltipIcon } from '@atlas/ui';
```

```vue
<TooltipIcon text="More info" />
```

##### Props

- `text` – tooltip text displayed on hover.
- `iconClass` – additional CSS classes applied to the icon.
- `pt` – passthrough options to customize internal elements.

#### TooltipInfo
```ts
import { TooltipInfo } from '@atlas/ui';
```

```vue
<TooltipInfo>
    Details here
</TooltipInfo>
```

##### Props

- `iconClass` – class for the info icon. Defaults to 'size-5'.

##### Events

- `toggle` – emitted with the visibility state when the popover is toggled.

##### Slots

- `default` – content displayed inside the popover.

### Navigation

#### ButtonMenu
```ts
import { ButtonMenu } from '@atlas/ui';
```

```vue
<ButtonMenu :items="items" @action="onAction" />
```

##### Props

- `items` – array of menu item objects.
- `icon` – icon class for the default trigger. Defaults to `'pi pi-ellipsis-v'`.
- `ptData` – additional data passed with the `action` event.
- `onHover` – show menu on hover instead of click.

##### Slots

- `trigger` – custom trigger element. Receives `{ toggleMenu, triggerRef }`.

##### Events

- `action` – emitted when an item is selected. Arguments: `(action, ptData)`.

#### Menu
```ts
import { Menu } from '@atlas/ui';
```

```vue
<Menu :model="items" />
```

##### API

Refer to the [PrimeVue Menu API](https://primevue.org/menu/#api).
#### Paginator
```ts
import { Paginator } from '@atlas/ui';
```

```vue
<Paginator :totalRecords="100" :rows="10" />
```

##### API

See the [PrimeVue Paginator API](https://primevue.org/paginator/#api).

#### Pagination
```ts
import { Pagination } from '@atlas/ui';
```

```vue
<Pagination :links="links" />
```

##### Props

- `links` – array of pagination link objects.
- `linkComponent` – component used for each link. Defaults to 'a'.


### Feedback

#### Alert
```ts
import { Alert } from '@atlas/ui';
```

```vue
<Alert>Default message</Alert>
```

##### Props

- `warning` – use warning styling.
- `hideIcon` – hide the default icon.

#### Errors
```ts
import { Errors } from '@atlas/ui';
```

```vue
<Errors :errors="formErrors" />
```

##### Props

- `errors` – record or array of error messages.
- `failed` – show a default error message when true and no errors are provided.
- `title` – optional heading text.
- `expandDefault` – expand errors by default.
- `pt` – passthrough options to customize internal elements.

##### Slots

- `default` – custom template for each error. Slot props: `{ error }`.
- `defaultError` – content shown when `failed` is true and no errors exist.

#### Toast
```ts
import { Toast } from '@atlas/ui';
```

```vue
<Toast />
```

##### API

Refer to the [PrimeVue Toast API](https://primevue.org/toast/#api).

#### ProgressBar
```ts
import { ProgressBar } from '@atlas/ui';
```

```vue
<ProgressBar :value="50" />
```

##### API

Refer to the [PrimeVue ProgressBar API](https://primevue.org/progressbar/#api).
