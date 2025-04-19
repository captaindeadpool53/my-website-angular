// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentViewComponent } from './components/content-view/content-view.component';
import { PageComponent } from './components/page/page.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HeaderComponent } from './components/header/header.component';
import { PageService } from './services/page.service';
import { CommentService } from './services/comment.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: ':pageId', component: PageComponent },
  { path: ':pageId/:subpageId', component: PageComponent },
  { path: ':pageId/:subpageId/:contentId', component: ContentViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentViewComponent,
    PageComponent,
    CommentsComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [PageService, CommentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
