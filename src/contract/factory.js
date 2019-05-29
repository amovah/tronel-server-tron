import web3 from 'Root/web3';
import abi from 'Root/abi/Factory.json';

export default web3.pi.contract(abi).at('0x08c8eb28727037a2b17e82106003f1510d1cb9d6');
