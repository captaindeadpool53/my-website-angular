import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  pageId: string | null = null;
  subpageId: string | null = null;
  pageData: any = { items: [] };

  // For horizontal submenu
  showSubMenu: boolean = false;
  subMenuItems: any[] = [];
  currentSubMenuId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageId = params.get('pageId');
      this.subpageId = params.get('subpageId');
      this.loadPageContent();
    });
  }

  loadPageContent() {
    if (!this.pageId) return;

    this.pageService
      .getPageById(this.pageId, this.subpageId)
      .subscribe((data) => {
        this.pageData = data;
        this.showSubMenu = this.pageData.hasSubMenu;
        if (this.showSubMenu) {
          this.loadSubMenuItems();
        }
      });
  }

  loadSubMenuItems() {
    // You could either hardcode these for the expressions page
    // Or better, fetch them from your service
    this.pageService.getSubMenuItems(this.pageId).subscribe((items) => {
      this.subMenuItems = items;
      this.currentSubMenuId = this.subpageId;

      // If no subpage is selected but submenus exist, you might want to
      // automatically select the first one
      if (!this.subpageId && this.subMenuItems.length > 0) {
        this.router.navigate(['/', this.pageId, this.subMenuItems[0].id]);
      }
    });
  }

  openItem(itemId: string) {
    // Any additional logic before navigation
    console.log(`Opening item ${itemId}`);
  }
}
