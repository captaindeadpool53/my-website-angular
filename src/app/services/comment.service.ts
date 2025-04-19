// services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private mockComments: { [itemId: string]: any[] } = {
    'network-1976': [
      {
        id: 'c1',
        text: 'This is such a prophetic film. The way it predicted the fusion of news and entertainment is eerie.',
        author: 'FilmBuff22',
        timestamp: '2023-09-15T14:30:00',
        likes: 5,
      },
      {
        id: 'c2',
        text: 'Howard Beale\'s "I\'m mad as hell" speech is one of the greatest moments in cinema history!',
        author: 'MovieCritic99',
        timestamp: '2023-10-03T09:45:00',
        likes: 8,
      },
    ],
    'jacobs-ladder': [
      {
        id: 'c3',
        text: 'The practical effects in this movie still hold up incredibly well after all these years.',
        author: 'HorrorFan45',
        timestamp: '2023-08-22T18:20:00',
        likes: 3,
      },
    ],
    'different-division': [
      {
        id: 'c4',
        text: 'Interesting perspective. I wonder how practical this would be in reality though.',
        author: 'PhilosophicalThinker',
        timestamp: '2023-11-05T11:15:00',
        likes: 2,
      },
    ],
  };

  constructor(private http: HttpClient) {}

  getComments(itemId: string): Observable<any[]> {
    // In a real application, this would make a GET request to an API
    // For mock purposes, we'll return the mock data
    return of(this.mockComments[itemId] || []);
  }

  addComment(itemId: string, text: string): Observable<any> {
    // In a real application, this would make a POST request to an API
    // For mock purposes, we'll add it to our local data
    const newComment = {
      id: `c${this.generateUniqueId()}`,
      text: text,
      author: 'CurrentUser', // In a real app, this would come from authentication
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    if (!this.mockComments[itemId]) {
      this.mockComments[itemId] = [];
    }

    this.mockComments[itemId].push(newComment);
    return of(newComment);
  }

  likeComment(itemId: string, commentId: string): Observable<any> {
    // In a real application, this would make a PUT request to an API
    const comments = this.mockComments[itemId];
    if (comments) {
      const comment = comments.find((c) => c.id === commentId);
      if (comment) {
        comment.likes += 1;
        return of(comment);
      }
    }
    return of(null);
  }

  deleteComment(itemId: string, commentId: string): Observable<boolean> {
    // In a real application, this would make a DELETE request to an API
    const comments = this.mockComments[itemId];
    if (comments) {
      const initialLength = comments.length;
      this.mockComments[itemId] = comments.filter((c) => c.id !== commentId);
      return of(initialLength > this.mockComments[itemId].length);
    }
    return of(false);
  }

  // Helper method to generate a simple unique ID
  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // For a real application, we would implement methods to communicate with a backend API
  // Example of what that would look like:
  /*
  getComments(itemId: string): Observable<any[]> {
    return this.http.get<any[]>(`api/items/${itemId}/comments`);
  }

  addComment(itemId: string, text: string): Observable<any> {
    return this.http.post<any>(`api/items/${itemId}/comments`, { text });
  }

  likeComment(itemId: string, commentId: string): Observable<any> {
    return this.http.put<any>(`api/items/${itemId}/comments/${commentId}/like`, {});
  }

  deleteComment(itemId: string, commentId: string): Observable<boolean> {
    return this.http.delete<boolean>(`api/items/${itemId}/comments/${commentId}`);
  }
  */
}
