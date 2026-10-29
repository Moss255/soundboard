import { currentUser, User } from "../library/auth";
import { SoundRecord } from "../library/client";
import { uploadNewSound } from "../library/data";

// This will hold the upload page
class UploadPage extends HTMLElement {
    connectedCallback() {
        this.render();
        document.querySelector('#upload-form')?.addEventListener('submit', this.uploadSound);
        document.querySelectorAll('#upload-form .file-input').forEach(input => {
            input.addEventListener('change', () => {
                const nameEl = input.closest('.file').querySelector('.file-name');
                nameEl.textContent = input.files.length ? input.files[0].name : 'No file selected';
            }); 
        });
    }

    async uploadSound(e: Event) {
        e.preventDefault();
        const uploadForm = document.querySelector('#upload-form') as HTMLFormElement;
        const form = new FormData(uploadForm);
        form.append('user', currentUser()?.id as string);
        form.append('order', '1');
        await uploadNewSound(form as unknown as SoundRecord);
    }

    render() {
        this.innerHTML = `
<form id="upload-form">
  <div class="field">
    <label class="label">File</label>
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="file">
        <span class="file-cta">
          <span class="file-label">Choose a file…</span>
        </span>
        <span class="file-name">No file selected</span>
      </label>
    </div>
  </div>

  <div class="field">
    <label class="label">Image</label>
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input class="file-input" type="file" name="image" accept="image/*">
        <span class="file-cta">
          <span class="file-label">Choose an image…</span>
        </span>
        <span class="file-name">No file selected</span>
      </label>
    </div>
  </div>

  <div class="field">
    <label class="label" for="name">Name</label>
    <div class="control">
      <input class="input" type="text" id="name" name="name" placeholder="Name">
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button type="submit" class="button is-primary">Upload</button>
    </div>
  </div>
</form>
        `
    }
}

window.customElements.define('upload-page', UploadPage);