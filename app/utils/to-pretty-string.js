export default function(value,
  {
    commas = true,
    fractionDigits = 2,
  } = {},
) {
  const [integer, fraction] = value.toString().split('.');

  const integerArray = [];
  if (commas) {
    const groupLength = 3;
    let i = integer.length;
    while (i >= groupLength) {
      integerArray.insertAt(0, integer.slice(i - groupLength, i));
      i -= groupLength;
    }
    i && integerArray.insertAt(0, integer.slice(0, i));
  } else {
    integerArray.push(integer);
  }

  return `${integerArray.join(',')}${fraction ?
    `.${fraction.slice(0, fractionDigits)}` :
    ''}`;
}
