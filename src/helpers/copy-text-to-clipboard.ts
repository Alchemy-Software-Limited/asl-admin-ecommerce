/**
 * Copy text to clipboard using the Clipboard API or fallback method
 *
 * @param {string} text - The text to copy to the clipboard
 */
function copyTextToClipboard(text: string): void {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        () => {
            // Copying to clipboard was successful
        },
        (err) => {
            console.error('Async: Could not copy text: ', err);
        }
    );
}

/**
 * Fallback method to copy text to clipboard using `execCommand`
 *
 * @param {string} text - The text to copy to the clipboard
 */
function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log(`Fallback: Copying text command was ${  msg}`);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

export default copyTextToClipboard;
