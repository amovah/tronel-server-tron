import tronweb from 'Root/tronweb';

export default () => tronweb.contract().at(process.env.FACTORY_ADDRESS);
