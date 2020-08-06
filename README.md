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
```js
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
#### Complex example, can listen for error
```javascript
const saveErrors = function(errors) {
  // Do something
  // record the errors to server
  console.log(errors)
  // The errors is instance is not of a type(s) object
}
const value = IntoJSON(data, schema, true, true, saveErrors)
```

Options
----
#### example
```js
import IntoJSON from 'into-json'
let data = null
const schema = {
	type: 'array'
}
const ck = (errors) => {
	console.log(errors)
}
data = IntoJSON(data, schema, false, true, ck) 
// Output
[]
```
| argument | description | type | default |
| --- | --- | --- | --- |
| data | the data want to convert. | any | - |
| schema | validator with the jsonschema. | json | - |
| isConsole | the data want to convert. | boolean | true |
| isRecord | the data want to convert. | boolean | false |
| callback | the data want to convert. | function | - |