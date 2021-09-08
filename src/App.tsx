import { createAdapter, EncryptionAlgorithm } from "iocane";

export default function App() {
  function encrypt(): void {
    const msg: HTMLTextAreaElement = document.querySelector("#msg")!;
    const key: HTMLTextAreaElement = document.querySelector("#key")!;

    if (!msg.value || !key.value) return;

    createAdapter()
      .setAlgorithm(EncryptionAlgorithm.CBC)
      .setDerivationRounds(14)
      .encrypt(msg.value, key.value)
      .then((res) => showResult(res.toString()));
  }
  function decrypt(): void {
    const msg: HTMLTextAreaElement = document.querySelector("#msg")!;
    const key: HTMLTextAreaElement = document.querySelector("#key")!;

    if (!msg.value || !key.value) return;

    createAdapter()
      .decrypt(msg.value, key.value)
      .then((res) => showResult(res.toString()));
  }
  function showResult(msg: string) {
    const message: HTMLTextAreaElement = document.querySelector("#msg")!;
    toggleBtn(true)
    message.value = msg;
  }
  function toggleBtn(state: boolean):void {
    const btn_copy: HTMLInputElement = document.querySelector("#btn_copy")!;
    btn_copy.hidden = state ? false : true
  }
  function resetFields(): void {
    const message: HTMLTextAreaElement = document.querySelector("#msg")!;
    const key: HTMLInputElement = document.querySelector("#key")!;

    toggleBtn(false)
    message.value = "";
    key.value = "";

  }
  function copyToClipboard(): void {
    const message: HTMLTextAreaElement = document.querySelector("#msg")!;
    navigator.clipboard.writeText(message.value)
  }

  return (
    <div className="container mt-5">
      <form>
        <div className="form-group m-2">
          <label className="mb-2">Message:</label>
          <textarea
            className="form-control"
            id="msg"
            placeholder="(text here)"
          />
        </div>
        <div className="form-group m-2">
          <label className="mb-2">Key:</label>
          <input
            type="password"
            className="form-control"
            id="key"
            placeholder="******"
          />
        </div>
      </form>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-auto py-3">
            <a className="btn btn-primary" href="/#" onClick={encrypt}>
              Encrypt
            </a>
          </div>
          <div className="col-auto py-3">
            <a className="btn btn-primary" href="/#" onClick={decrypt}>
              Decrypt
            </a>
          </div>
          <div className="col-auto py-3">
            <a className="btn btn-secondary" href="/#" onClick={resetFields}>
              Reset
            </a>
          </div>
          <div className="col-auto py-3">
            <a className="btn btn-success" href="/#" id="btn_copy" hidden={true} onClick={copyToClipboard}>
              Copy to Clipboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
