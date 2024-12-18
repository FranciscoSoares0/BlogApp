import { Component,inject } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from '../../interfaces/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  commentsService = inject(CommentsService);
  route = inject(ActivatedRoute);

  postID : string = "";
  commentsData : Array<IComment> = [];

  ngOnInit(): void{
    this.route.params.subscribe((val) => {
      console.log(val);
      this.postID = val['id'];
      this.commentsService.getCommentsByPostId(this.postID).subscribe((data)=>{
        console.log("comments")
        console.log(data)
        this.commentsData = data;
      })
    })
  }
}
