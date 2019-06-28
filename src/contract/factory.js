import tronweb from 'Root/tronweb';

export default () => tronweb.contract().at(process.env.SMART_CONTRACT_ADDRESS);
