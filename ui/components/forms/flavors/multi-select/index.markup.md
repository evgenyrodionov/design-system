Multi Select picklists that allow for draggable options between picklists. Picklist options can also be re-ordered.

<h4 class="site-text-heading--label">Accessibility</h4>
This component is essentially 2 ARIA listboxes side by side, so we follow the [ARIA practices guide](https://www.w3.org/TR/wai-aria-practices/#Listbox) to help implement their interaction in an accessible way. Some additional details, supplementary to the ARIA guide include:

**Notable attributes**
- `aria-multiselectable="true"` should be set on each listbox
- `aria-selected` should be placed on each `role="option`, and only set to `true` when selected
- `aria-labelledby` is used to identify the list to the user and should point to the list label
- `aria-describedby` is used to provide operation instructions for the Drag and Drop interaction

**Keyboard navigation**
- Each list is a tab stop. This provides identification and operation instruction as provided by `aria-describedby` and `aria-labelledby`. State of the overall list is also provided, including total number and number of selected options in the list when focused.
- Because we support drag and drop re-ordering, we implement the second multi-select keyboard model.
  - Up and Down arrows move focus _and_ selection, with `aria-selected="true"`
  - `shift + up` and `shift + down` moved focus and creates addition selections
  - `ctrl + down` or `ctrl + up` moves focus but selection remains where it is
  - `ctrl + space` toggles selection on the focused option, in addition to previous selections
  - `ctrl + a` selects all options in the list
  - `cmd/ctrl + right` and `cmd/ctrl + left` Moves selected items between lists
  - `space` toggles "Drag and Drop" mode. When in "Drag and Drop" mode:
    - Up and Down arrows move the selected items _within_ the current list

**Updating Operation and State**
- As a user interacts with the component, pay close attention to the content of the `aria-live` region and the `option-drag-label` assistive text. This is to provide clear instruction to the user on how to proceed, and what has happened in each State the component will be in
