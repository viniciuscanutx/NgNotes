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
  return sanitizer.bypassSecurityTrustHtml(clean as string);
}

function escapeHtml(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function getTagColorClass(tag: string): string {
  const tagColors: Record<string, string> = {
    'Design': 'color-design',
    'Medicine': 'color-medicine',
    'Sport': 'color-sport',
    'Finance': 'color-finance',
    'Work': 'color-work',
  };
  return tagColors[tag] || 'color-default';
}