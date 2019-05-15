import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PostService } from '../post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 posts : any [];


  constructor(private service: PostService) { 
    
  }

  ngOnInit() {
    this.service.getPost()
    .subscribe(response =>{
      this.posts = response.json();
      
    },error =>{
      alert('An Unexpected error occured.');
      console.log(error);
    });
   }

 createPost(input:HTMLInputElement){
  let post = {title: input.value};
  input.value = "";
  
    this.service.createPost(post)
    .subscribe(response =>{
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
      console.log(response.json());
    },
    (error: AppError) =>{
      if (error instanceof BadInput)
      
      {
        // this.form.setErrors(error.originalError);
      }
      else{
      alert('An Unexpected error occured.');
      console.log(error);
    }
    })
  }

  updatePost(post: any){
  this.service.updatePost(post)
   // this.http.put(this.url,JSON.stringify(post))
   .subscribe(response =>{
     console.log(response);
   },
   error =>{
    alert('An Unexpected error occured.');
    console.log(error);
  })
  }

  deletePost(post){
    this.service.deletePost(1)
    .subscribe(
      response => {
       let index = this.posts.indexOf(post);
       this.posts.splice(index, 1);
      console.log(response);
    },
    (error: AppError)  => {
      
      if (error instanceof NotFoundError)
        alert('this post already been deleted');

        else{
          alert('An Unexpected error occured.');
          console.log(error);
        }
      
    })
  }

 

}
