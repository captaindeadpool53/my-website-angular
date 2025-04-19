// components/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mainPages: any[] = [];
  currentPageId: string = '';
  expandedSections: { [key: string]: boolean } = {};

  constructor(private pageService: PageService, private router: Router) { }

  ngOnInit(): void {
    this.pageService.getMainPages().subscribe(pages => {
      this.mainPages = pages;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const urlParts = event.url.split('/');
      this.currentPageId = urlParts[1] || 'home';
    });
  }

  toggleSection(pageId: string): void {
    this.expandedSections[pageId] = !this.expandedSections[pageId];
  }

  isSectionExpanded(pageId: string): boolean {
    return this.expandedSections[pageId] === true;
  }
}

// components/sidebar/sidebar.component.html


// components/sidebar/sidebar.component.scss
