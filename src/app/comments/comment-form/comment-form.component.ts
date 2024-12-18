import { CommonModule } from '@angular/common';
import { Component , inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IComment } from '../../interfaces/comment';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { NgForm } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {

  route = inject(ActivatedRoute);
  commentsService = inject(CommentsService);

  postID :string = "";

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log(val);
      this.postID = val['id'];
    })
  }

  onSubmit(formData:any){
    const commentData:IComment = {
      name: formData.value.name,
      comment:formData.value.comment,
      postID:this.postID,
      createdAt: Timestamp.now(),
    }

    this.commentsService.addComment(commentData).subscribe(()=>{
      formData.reset();
    });
  }
}
