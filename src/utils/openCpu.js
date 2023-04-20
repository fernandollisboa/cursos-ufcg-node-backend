import fetch from 'node-fetch';

export default async function openCpu(_package, method, params) {
  return 'still testing';
  // const response = await fetch(`http://pre-ocpu/ocpu/library/${_package}/R/${method}`, {
  //   method: 'POST',
  //   body: params,
  // });
  // console.log('response', response);

  // if (!response.ok) {
  //   throw new Error('Error with R Server');
  // }

  // return response.text(); // TODO sera que json ne meió?
}
