# API

## Create a paste

### Request

**Method:** `POST /api/paste`

#### Body

| Name                | Type      | Description                                                                     | Required |
| ------------------- | --------- | ------------------------------------------------------------------------------- | -------- |
| `content`           | `string`  | Paste content. If encrypted, must be encoded into a string (preferably Base64). | Yes      |
| `config`            | `object`  | Configuration for the paste                                                     | No       |
| `passwordProtected` | `boolean` | Whether the paste is password protected.                                        | No       |
| `initVector`        | `string`  | Initialization vector for AES encryption. Max length: 64.                       | No       |

**Config Object:**

| Name            | Type      | Description                                              | Required |
| --------------- | --------- | -------------------------------------------------------- | -------- |
| `language`      | `string`  | Programming language of the paste. Default: `plaintext`. | No       |
| `encrypted`     | `boolean` | Whether the paste is encrypted. Default: `false`.        | No       |
| `expiresAfter`  | `number`  | Time in seconds until the paste expires.                 | No       |
| `burnAfterRead` | `boolean` | Whether the paste is deleted after reading.              | No       |

### Examples

```json
{
    "content": "i0n3PW6qDUhDaTrzoKg+/ip4qQwu+iq8/fWDVg==",
    "config": {
        "language": "plaintext",
        "encrypted": true,
        "expiresAfter": 3600,
        "burnAfterRead": false
    },
    "passwordProtected": false,
    "initVector": "27DIWK00yDiGx001"
}
```

```json
{
    "content": "Hello World!",
    "config": {
        "language": "plaintext"
    }
}
```

## Get a paste

### Request

**Method:** `GET /api/paste`

#### Query Parameters

| Name  | Type     | Description | Required |
| ----- | -------- | ----------- | -------- |
| `key` | `string` | Paste key.  | Yes      |
