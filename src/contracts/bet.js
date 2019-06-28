import tronweb from 'Root/tronweb';

export default address => tronweb.contract().at(address);
