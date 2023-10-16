import CryptoJS from 'crypto-js';

export function toHex(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  var tmp = parseFloat(h2d(result)).toString().split('.');
  return tmp[0] + '.' + tmp[1];
}

export function createKey(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function h2d(s) {
  function add(x, y) {
    var c = 0,
      r = [];
    var x2 = x.split('').map(Number);
    var y2 = y.split('').map(Number);
    while (x2.length || y2.length) {
      var s = (x2.pop() || 0) + (y2.pop() || 0) + c;
      r.unshift(s < 10 ? s : s - 10);
      c = s < 10 ? 0 : 1;
    }
    if (c) r.unshift(c);
    return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function (chr) {
    var n = parseInt(chr, 16);
    for (var t = 8; t; t >>= 1) {
      dec = add(dec, dec);
      if (n & t) dec = add(dec, '1');
    }
  });
  return dec;
}

export function processKeys({ undertaker, randyOrton, johnCena }) {
  const randomstring = createKey(Math.floor(Math.random() * 100 + 1));
  const priv = CryptoJS.SHA256(randomstring).toString();
  const iv = CryptoJS.enc.Utf8.parse(undertaker);

  // const iv2 = undertaker;
  const pks = johnCena;
  const publicKey = randyOrton;

  //Generate PKC
  const pkc = toHex(publicKey) * toHex(priv);
  //   var hpkc = CryptoJS.SHA256(pkc).toString();

  //Generate encrypt key
  const pkskc = Math.log(pks) + Math.log(toHex(priv));
  const hpkskc = CryptoJS.SHA256(pkskc.toString()).toString();
  const cutkey = hpkskc.substring(0, 32);

  return { iv, cutkey, pkc, hpkskc };
}

export function decrypt(data, store) {
  var send2 = CryptoJS.AES.decrypt(data, store.getters.encryptionKey, {
    iv: store.getters.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  let textPlain = send2.toString(CryptoJS.enc.Utf8);

  return JSON.parse(textPlain);
}

export function encrypt(payload, store) {
  const jsonText = JSON.stringify(payload);

  const encryptedJson = CryptoJS.AES.encrypt(
    jsonText,
    store.getters.encryptionKey,
    {
      iv: store.getters.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    }
  ).toString();

  const finalPayload = {
    json: encryptedJson,
  };

  return finalPayload;
}
