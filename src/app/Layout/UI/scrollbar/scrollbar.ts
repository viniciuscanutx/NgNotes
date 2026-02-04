import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  imports: [],
  templateUrl: './scrollbar.html',
  styleUrl: './scrollbar.scss',
})
export class Scrollbar implements AfterViewInit {
  @ViewChild('scrollContent') scrollContentRef!: ElementRef<HTMLElement>;

  scrollable = false;
  thumbHeight = 0;
  thumbTop = 0;

  private thumbDragStartY = 0;
  private thumbDragStartScrollTop = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateScrollbar();
    const el = this.scrollContentRef?.nativeElement;
    if (el && typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.updateScrollbar()).observe(el);
    }
  }

  onScroll(): void {
    this.updateScrollbar();
  }

  updateScrollbar(): void {
    const el = this.scrollContentRef?.nativeElement;
    if (!el) return;
    const { scrollHeight, clientHeight, scrollTop } = el;
    if (scrollHeight <= clientHeight) {
      this.scrollable = false;
      this.cdr.markForCheck();
      return;
    }
    this.scrollable = true;
    const trackHeight = clientHeight;
    this.thumbHeight = Math.max(
      20,
      (clientHeight / scrollHeight) * trackHeight
    );
    const maxThumbTop = trackHeight - this.thumbHeight;
    const maxScroll = scrollHeight - clientHeight;
    this.thumbTop =
      maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;
    this.cdr.markForCheck();
  }

  onTrackClick(event: MouseEvent): void {
    const track = event.currentTarget as HTMLElement;
    const el = this.scrollContentRef?.nativeElement;
    if (!el || track !== event.target) return;
    const rect = track.getBoundingClientRect();
    const ratio = (event.clientY - rect.top) / rect.height;
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
  }

  onThumbMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const el = this.scrollContentRef?.nativeElement;
    if (!el) return;
    this.thumbDragStartY = event.clientY;
    this.thumbDragStartScrollTop = el.scrollTop;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const maxThumbTop = el.clientHeight - this.thumbHeight;
    const onMove = (e: MouseEvent) => {
      const deltaY = e.clientY - this.thumbDragStartY;
      const scrollDelta =
        maxThumbTop > 0 ? deltaY * (maxScroll / maxThumbTop) : 0;
      el.scrollTop = Math.max(
        0,
        Math.min(maxScroll, this.thumbDragStartScrollTop + scrollDelta)
      );
      this.thumbDragStartY = e.clientY;
      this.thumbDragStartScrollTop = el.scrollTop;
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }
}
