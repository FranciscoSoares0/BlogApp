import { Component, inject } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit {

  route = inject(ActivatedRoute);
  postService = inject(PostService);

  postsData : Array<IPost> = [];
  category : string = "";

  ngOnInit(): void {
    this.route.params.subscribe((val)=>{
      this.category = val['category'];
      this.postService.getCategoryPosts(val['id']).subscribe((data)=>{
        this.postsData = data;
      })
    })
    //
  }

}
