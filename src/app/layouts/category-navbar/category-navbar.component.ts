import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent implements OnInit {

  categoriesService = inject(CategoriesService);
  
  categoriesData : Array<ICategory> = [];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data)=>{
      this.categoriesData = data;
    })
  }

  
}
