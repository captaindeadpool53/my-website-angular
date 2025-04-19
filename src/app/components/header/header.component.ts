// components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: any = {};
  categories: any[] = [];
  selectedCategory: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const pageId = this.route.snapshot.paramMap.get('pageId') || 'home';
      const subpageId = this.route.snapshot.paramMap.get('subpageId');
      
      this.loadPageData(pageId, subpageId);
    });
  }

  loadPageData(pageId: string, subpageId?: string | null): void {
    this.pageService.getPageById(pageId, subpageId).subscribe(page => {
      this.currentPage = page;
      this.categories = page.categories || [];
      this.selectedCategory = '';
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}

// components/header/header.component.html


// components/header/header.component.scss
