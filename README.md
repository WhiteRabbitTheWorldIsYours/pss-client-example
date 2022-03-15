## Partner Streaming Site for WhiteRabbit example

This is a demo of how any streaming site may use WhiteRabbit client to request payment for the movie from it's users.

## Usage

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

## WhiteRabbitClient API

### `new WhiteRabbitClient(whiterabbitConfig)`

Create a new client instance.

Arguments:

* `whiteRabbitConfig` — config object with attributes:

  * `host` — (optional) host of whiterabbit wallet instance. Defaults to `https://wallet.whiterabbit.one`

### `client.requestPayment(imdbId, [pssAddress], [medium])`

Request a payment by movie's imdb ID. Example: `tt8367814`. Returns a Promise which resolves with the status of the payment.

Arguments:
* `imdbId` - imdb ID for the movie.
* `pssAddress - (Optional) A public address on XDAI Chain you want to receive your PSS share to. Every payment collected via your streaming site will be split between rightsholder, WhiteRabbit and you. This is your way to specify the address you want to reeive your parts of the split to.
* `medium` - (Optional) One of the possible mediums. Defaults to "EST". Don't change it unless you understand what you are doing.

