import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {
  @Input() itemId: string | null = null;
  @Output() closeComments = new EventEmitter<void>();
  
  comments: any[] = [];
  newComment: string = '';

  constructor(private commentService: CommentService) { }

  ngOnChanges(): void {
    if (this.itemId) {
      this.loadComments();
    }
  }

  loadComments(): void {
    if (this.itemId) {
      this.commentService.getComments(this.itemId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  addComment(): void {
    if (this.newComment.trim() && this.itemId) {
      this.commentService.addComment(this.itemId, this.newComment).subscribe(() => {
        this.loadComments();
        this.newComment = '';
      });
    }
  }

  close(): void {
    this.closeComments.emit();
  }
}