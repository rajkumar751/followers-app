import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({ 
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  constructor(private http: Http) { }
  followers: any
  
  ngOnInit() {
    this.http.get('https://api.github.com/users/fabpot/followers')
    .subscribe(response =>{
      this.followers = response.json();
    })
  }

}
