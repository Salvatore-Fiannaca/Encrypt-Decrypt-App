export function generateKey(len: number = 8): string {
    let randomKey: string = '';
    const char : string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!£$%&/()=^?";
    for (let i = 0; i < len; i++) {
      let randomChar: string = char[Math.floor(Math.random() * 64)];
      randomKey +=  randomChar;
    }
    return randomKey
}

export function copyToClipboard(txt : string) {
  if (txt) {
    try {
      if (window.isSecureContext) {
        return navigator.clipboard.writeText(txt)
      }

      var textArea = document.createElement("textarea");
      textArea.value = txt;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
    } catch (error) {
      alert("Cannot copy to clipboard")
    } 
  }
}