import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

  @Input() postData:IPost = {
    title: "",
    excerpt: "",
    permalink:"",
    content:"",
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

  ngOnInit(): void {}
}
