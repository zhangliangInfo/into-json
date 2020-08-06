IntoJSON
========
Purpose
---
Convert to JSON based on jsonschema.<br>
the jsonschema based on draft4.

Install
---
npm i into-json -S

UseAge
---
#### Simple
```
import IntoJSON from 'into-json'
const data = null
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    value: { type: 'number' },
    children: {
      type: 'array'
    }
  }
}
const value = IntoJSON(data, schema)

console.log(value)
// Output
{
  name: '',
  value: null,
  children: []
}
```
### Complex example, can listen for error
```
const saveErrors = function(errors) {
  <!-- record the errors to server -->
}
const value = IntoJSON(data, schema, true, true, saveErrors)
```

Options
----
| argument | description | type | default |
| --- | --- | --- | --- |
| data | the data want to convert. | any | - |
| schema | validator with the jsonschema. | JSON | - |
| isConsole | the data want to convert. | any | true |
| isRecord | the data want to convert. | any | false |
| callback | the data want to convert. | any | - |