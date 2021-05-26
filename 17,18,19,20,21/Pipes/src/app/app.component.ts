import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  fireUrl: string = "https://angular-guide-84051-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"

  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private postService: PostsService
  ) { }

  ngOnInit() {

    this.subscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService
      .createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deleteData()
      .subscribe(() => {
        this.loadedPosts = [];
      })
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
