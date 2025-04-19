// services/page.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private mockData = {
    mainPages: [
      {
        id: 'expressions',
        title: 'Expressions',
        hasSubMenu: true,
        subpages: [
          { id: 'movie-reviews', title: 'Movie reviews' },
          { id: 'poems', title: 'Poems' },
          { id: 'ideas', title: 'Ideas and Innovations' },
          { id: 'projects', title: 'Projects' },
          { id: 'thoughts', title: 'Thoughts' },
          { id: 'book-reviews', title: 'Book reviews' },
        ],
      },
      {
        id: 'cover-videos',
        title: 'Cover Videos',
        subpages: [],
      },
      {
        id: 'photos',
        title: 'Photos',
        subpages: [],
      },
    ],
    pages: {
      expressions: {
        id: 'expressions',
        title: 'Expressions',
        subpages: [
          { id: 'movie-reviews', title: 'Movie reviews' },
          { id: 'poems', title: 'Poems' },
          { id: 'ideas', title: 'Ideas and Innovations' },
          { id: 'projects', title: 'Projects' },
          { id: 'thoughts', title: 'Thoughts' },
          { id: 'book-reviews', title: 'Book reviews' },
        ],
        categories: [
          { id: 'movie-reviews', title: 'Movie reviews' },
          { id: 'poems', title: 'Poems' },
          { id: 'ideas', title: 'Ideas and Innovations' },
          { id: 'projects', title: 'Projects' },
          { id: 'thoughts', title: 'Thoughts' },
          { id: 'book-reviews', title: 'Book reviews' },
        ],
        hasSubMenu: true,
        items: [
          {
            id: 'network-1976',
            title: 'Network (1976)',
            date: 'May 20, 2021',
            description:
              'From a production and film making perspective, this movie is marvelous. There is no actor who did a subpar job.',
            image: 'assets/network.jpg',
            category: 'movie-reviews',
          },
          {
            id: 'jacobs-ladder',
            title: "Jacob's Ladder (1990)",
            date: 'May 29, 2020',
            description:
              "The brilliant cinematography lures you into the flashbacks and visions of war as the protagonist suffers from post traumatic stress to the point where you can't tell what's a vision anymore.",
            image: 'assets/jacobs-ladder.jpg',
            category: 'movie-reviews',
          },
          {
            id: 'different-division',
            title: 'A Different Kind of Division',
            date: 'July 23, 2023',
            description:
              "I wish countries weren't divided based on the location you're born, or the family you're born into, but the ideology you choose to accept and work towards.",
            category: 'thoughts',
          },
          {
            id: 'parts-of-myself',
            title: 'Parts of Myself',
            date: 'August 13, 2024',
            description:
              'They are me, but segmented into parts. Some are more familiar than others. Dominating my personality. My tastes, my aspirations, my self image.',
            category: 'poems',
          },
          {
            id: 'wont-be-judged',
            title: "You probably won't be judged",
            date: 'August 28, 2024',
            description:
              "You knew what was being done. But you didn't care. You supported it, for you it was fun.",
            category: 'poems',
          },
        ],
      },
      'cover-videos': {
        id: 'cover-videos',
        title: 'Cover Videos',
        categories: [],
        items: [
          {
            id: 'killing-in-the-name',
            title: 'Killing In the Name Of',
            date: 'October 13, 2024',
            description: 'Rage Against The Machine cover',
            image: 'assets/cover1.jpg',
            category: 'music',
          },
          {
            id: 'bulls-on-parade',
            title: 'Bulls on Parade',
            date: 'July 23, 2024',
            description: 'Rage Against The Machine cover',
            image: 'assets/cover2.jpg',
            category: 'music',
          },
        ],
      },
    },
  };

  constructor(private http: HttpClient) {}

  getMainPages(): Observable<any[]> {
    return of(this.mockData.mainPages);
  }

  getPageById(pageId: string, subpageId?: string | null): Observable<any> {
    const page = this.mockData.pages[pageId];

    if (page && subpageId) {
      // Filter items by category if subpageId is provided
      const filteredPage = { ...page };
      filteredPage.items =
        page.items?.filter((item) => item.category === subpageId) || [];
      return of(filteredPage);
    }

    return of(page || {});
  }

  getPageItemById(pageId: string, itemId?: string | null): Observable<any> {
    const page = this.mockData.pages[pageId];

    if (page && itemId) {
      // Filter items by category if subpageId is provided
      const filteredPage = { ...page };
      filteredPage.items =
        page.items?.filter((item) => item.id === itemId) || [];
      return of(filteredPage);
    }

    return of(page || {});
  }

  getSubMenuItems(pageId: string): Observable<any[]> {
    const page = this.mockData.mainPages.find((p) => p.id === pageId);
    return of(page?.subpages || []);
  }
}
