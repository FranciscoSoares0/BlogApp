import { Component,inject } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { OnInit } from '@angular/core';
import {IPost} from '../../interfaces/post'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  postService = inject(PostService);
  featuredPostsData : Array<IPost> = [];
  latestPostData : Array<IPost> = [];

  ngOnInit(): void{
    this.postService.getFeaturedPosts().subscribe((data)=>{
      this.featuredPostsData = data;
      console.log(this.featuredPostsData)
    })
    this.postService.getLatestPosts().subscribe((data)=>{
      this.latestPostData = data;
      console.log(this.latestPostData)
    })
  }

}
