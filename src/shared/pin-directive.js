// function applyStyle(element, binding) {
//   Object.keys(binding.value).forEach((position) => {
//     element.style[position] = binding.value[position];
//   });
//   element.style.position = 'absolute';
// }

// export default {
//   bind: (element, binding) => {
//     // argument variant with modifiers

//     // if (binding.arg !== 'position') {
//     //   return;
//     // }
//     // Object.keys(binding.modifiers).forEach((key) => {
//     //   element.style[key] = '5px';
//     // });
//     // element.style.position = 'absolute';

//     // expresion varianwt with an object
//     applyStyle(element, binding);
//   },
//   // directive update hook
//   update: (element, binding) => {
//     applyStyle(element, binding);
//   },
// };

export default function (element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
}
