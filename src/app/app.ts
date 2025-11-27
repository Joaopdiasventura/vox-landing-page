import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly deepLink = 'vox://open';

  public ngOnInit(): void {
    if (typeof window == 'undefined' || typeof document == 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const shouldOpen = params.get('notOpen') != 'true';
    if (!shouldOpen) return;
    this.tryOpenApp(this.deepLink);
  }

  private tryOpenApp(link: string): void {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = link;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 1500);
    } catch {}
  }
}
