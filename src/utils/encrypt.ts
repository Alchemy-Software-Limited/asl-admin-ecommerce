export const encrypt = (text: string = '', salt: string = '12'): string => {
  // Convert each character of the string to its char code
  const textToChars = (t: string): number[] => t.split('').map((c) => c.charCodeAt(0));

  // Convert a number to a 2-character hex string
  const byteHex = (n: number): string => `0${n.toString(16)}`.slice(-2);

  // XOR each char code with the salt's char codes
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = (code: number): number => textToChars(salt).reduce((a, b) => a ^ b, code);

  // Process the input text by converting to char codes, applying salt, and converting to hex
  return text
    .split('') // Split the input text into characters
    .map((char) => char.charCodeAt(0)) // Map each character to its char code
    .map(applySaltToChar) // Apply the salt to each char code
    .map(byteHex) // Convert the result to hex
    .join(''); // Join all hex values into a string
};
