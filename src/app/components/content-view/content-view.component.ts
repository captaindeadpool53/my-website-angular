// components/content-view/content-view.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { PageService } from '../../services/page.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss'],
})
export class ContentViewComponent {
  // @Input() itemId: string | null = null;
  item: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadPageData();
      });

    this.loadPageData();
  }

  loadPageData(): void {
    const pageId = this.route.snapshot.paramMap.get('pageId') || 'home';
    const subpageId = this.route.snapshot.paramMap.get('subpageId');
    const itemId = this.route.snapshot.paramMap.get('contentId');

    this.pageService.getPageItemById(pageId, itemId).subscribe((page) => {
      this.item = page;
    });
  }

  // ngOnChanges(): void {
  //   if (this.itemId) {
  //     this.pageService.getItemById(this.itemId).subscribe(item => {
  //       this.item = item;
  //     });
  //   }
  // }
}
