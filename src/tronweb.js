import TronWeb from 'tronweb';

const tronweb = new TronWeb({
  fullHost: process.env.NODE_ENV === 'development'
    ? 'https://api.shasta.trongrid.io'
    : 'https://api.trongrid.io',
  privateKey: process.env.PRIVATE_KEY,
});

export default tronweb;
