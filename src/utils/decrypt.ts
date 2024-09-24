export const decrypt = (encoded: string = '', salt: string = '12'): string => {
  // Convert text to an array of character codes
  const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0));

  // XOR each character code with the salt
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a, b) => a ^ b, code);

  // Ensure the encoded string is valid
  return (
    encoded
      .match(/.{1,2}/g) // Split the encoded string into 2-character hex segments
      ?.map((hex) => parseInt(hex, 16)) // Convert hex to integers
      .map(applySaltToChar) // Apply the XOR operation with the salt
      .map((charCode) => String.fromCharCode(charCode)) // Convert back to characters
      .join('') || ''
  ); // Join the characters and handle possible null values
};
