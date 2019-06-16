import web3 from 'Root/web3';
import abi from 'Root/abi/Factory.json';

export default web3.pi.contract(abi).at('0x3ff0251e8d86856318f3a1a083d4b0f84b953171');
