## Partner Streaming Site for WhiteRabbit example

This is a demo of how any streaming site may use WhiteRabbit client to request payment for the movie from it's users.

## Usage

```
npm install
npm start
```

## WhiteRabbitClient usage

Install `@whiterabbitjs/client` package

```sh
npm install --save @whiterabbitjs/client
```

Then use it on your webpage

```js
import { WhiteRabbitClient } from '@whiterabbitjs/client';

const client = new WhiteRabbitClient();

client.requestPayment('tt8367814');
```

Or if you are not using npm:

```js
import { WhiteRabbitClient } from 'https://unpkg.com/@whiterabbitjs/client@2.40.1/dist/index.min.mjs';
const client = new WhiteRabbitClient();

client.requestPayment('tt8367814');
```

## WhiteRabbitClient API

### `new WhiteRabbitClient(whiterabbitConfig)`

Create a new client instance.

Arguments:

* `whiteRabbitConfig` — config object with attributes:

  * `host` — (optional) host of whiterabbit wallet instance. 
     Possible options:
      - `https://wallet.whiterabbit.one`. (default). Production mode. Card deposits will require a real card. If `host` is not specified this mode will be used
      - `https://staging-wallet.whiterabbit.one`. Test mode. Card deposits can be tested with a test card (see below).
  * `campaign` — (optional) name of the campaign. Could be used to adapt look and feel of the payment popup

### `client.requestPayment(imdbId, [pssAddress], [medium])`

Request a payment by movie's imdb ID. Example: `tt8367814`. Returns a Promise which resolves with the status of the payment.

Arguments:
* `imdbId` - imdb ID for the movie.
* `pssAddress` - (Optional) A public address on XDAI Chain you want to receive your PSS share to. Every payment collected via your streaming site will be split between rightsholder, WhiteRabbit and you. This is your way to specify the address you want to receive your parts of the split to.
* `medium` - (Optional) One of the possible mediums. Defaults to "EST". Don't change it unless you understand what you are doing.

## Test card details

Use one of the test card numbers when the client is running in a test mode: https://developers.circle.com/docs/test-card-numbers

For example:

```
card number: 4007400000000007
cvc: 222
expiry date: 07/25
name: John Doe
city: Berlin
country: Germany
address: Warshauer Str. 68
postal code: 10243
```
