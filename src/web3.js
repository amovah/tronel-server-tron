import Web3 from 'pweb3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://54.68.240.52:6969/child_0'));

// async function test() {
//   const res = await web3.pi.getBalance('0x0BdC6Ba0371D8D3c27fb6a0dF419b77E07AE74A2');
//
//   console.log(res.toString(10));
// }
//
// test();

export default web3;
