import { Component, inject } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostCardComponent,CommentFormComponent,CommentListComponent,CommonModule,SafeHtmlPipe],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {
  rawHtml: string = '<p>This is <strong>HTML</strong> content!</p>';
  safeHtml: SafeHtml = ''; // Initialize with an empty string
  post: IPost = {
    title: "",
    excerpt: "",
    permalink: "",
    content: "",
    category: {
      categoryId: "",
      category: "",
    },
    postImgPath: "",
    isFeatured: false,
    views: 0,
    status: "",
    createdAt: Timestamp.now(),
  };

  similarPosts: IPost[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.rawHtml); // Convert HTML
    this.route.params.subscribe((val) => {
      this.postService.incrementViews(val['id']).subscribe(()=>{
        this.postService.getPostById(val['id']).subscribe((data) => {
          this.post = data!;
          this.rawHtml = this.post.content;
          this.postService.getSimilarPosts(this.post.category.categoryId,val['id']).subscribe((data)=>{
            this.similarPosts = data;
          })
        });
      })
    });
  }
}
