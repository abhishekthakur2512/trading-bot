const google = require('googleapis');
const credentials = require('./keys.json');

const authorize = () => {
  const client = new google.google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['http://googleapis.com/auth/spreadsheets']
  );
  
  client.authorize((err, tokens) => {
    if(err) { console.log(err); return; }
    console.log('Connected');
    gsrun(client);
  });
};

const gsrun = async (client) => {
  const gsapi = google.google.sheets({version: 'v4', auth: client});
  const opt = {
    spreadsheetId: '1ua-otMr_BkispmYdsczr_UDEhQwvdUvf8dT6Sbw2vpQ',
    range: 'Data!A1:B3'
  };
  const rows = await gsapi.spreadsheets.values.get(opt);
  console.log(rows);
};


const main = () => {
  authorize()
};


main();