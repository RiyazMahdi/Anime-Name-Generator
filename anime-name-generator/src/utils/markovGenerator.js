import firstNames from './character_names.json';
import surnames from './surnames.json';

//* Train a Markov model using bigrams
function trainBigramModel(names) {
  const model = {};

  for (let name of names) {
    name = `^${name.toLowerCase()}$`;
    for (let i = 0; i < name.length - 2; i++) {
      const bigram = name.slice(i, i + 2);
      const nextChar = name[i + 2];

      if (!model[bigram]) model[bigram] = [];
      model[bigram].push(nextChar);
    }
  }

  return model;
}

//* Generate a name from the model
function generateName(model, maxLength = 8) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (true) {
    let current = '^' + alphabet[Math.floor(Math.random() * alphabet.length)];
    let name = current[1]; // skip the ^, start with the 2nd char

    while (true) {
      if (!model[current]) break;

      const nextChar = model[current][Math.floor(Math.random() * model[current].length)];
      if (nextChar === '$' || name.length >= maxLength) break;

      name += nextChar;
      current = current[1] + nextChar; // move bigram window forward
    }

    if (name.length >= 3 && name.length <= maxLength) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
}

//* Generate a full name
export function generateFullName() {
  const firstModel = trainBigramModel(firstNames);
  const lastModel = trainBigramModel(surnames);

  const first = generateName(firstModel);
  const last = generateName(lastModel);
  return `${first} ${last}`;
}
