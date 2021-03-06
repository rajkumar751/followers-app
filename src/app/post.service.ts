import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AppError } from './common/app-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NotFoundError } from './common/not-found-error';
import { BadInput } from './common/bad-input';

@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http : Http) { }

   getPost(){
   return this.http.get(this.url);
   }

   createPost(post: { title: string; }){
    return this.http.post(this.url, JSON.stringify(post))
    .catch((error: Response) =>{
      if (error.status === 400)
        return Observable.throw(new BadInput(error.json()));
      
        return Observable.throw(new AppError(error.json()));
    });
   }

   updatePost(post: { id: string; }){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
    }

    deletePost(id){
     return this.http.delete(this.url + '/' + id)
     .catch((error: Response)=>{
       if(error.status === 404)
        return Observable.throw(new NotFoundError());
       
       return Observable.throw(new AppError(error));
      
     });  
    }

}
