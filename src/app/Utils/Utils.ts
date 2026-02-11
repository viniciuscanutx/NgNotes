import { marked } from "marked";
import DOMPurify from "dompurify";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NoteModel } from "../Model/Note";
    
export function processSnippet(note: NoteModel, sanitizer: DomSanitizer): SafeHtml | null {
    if (!note || !note.content) {
      return null;
    }
    const raw = marked.parse(note.content);
    const clean = (DOMPurify as any).sanitize(raw);
    const temp = document.createElement('div');
    temp.innerHTML = clean as string;
    let text = temp.textContent || temp.innerText || '';
    const max = 140;
    if (text.length > max) {
      text = text.slice(0, max).trim() + '...';
    }
    const escaped = escapeHtml(text);
    return sanitizer.bypassSecurityTrustHtml(`<p>${escaped}</p>`);
}

function escapeHtml(input: string): string {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}