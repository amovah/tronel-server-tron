import web3 from 'Root/web3';
import abi from 'Root/abi/Bet.json';

export default address => web3.pi.contract(abi).at(address);
