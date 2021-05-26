import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from "./post.model";
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class PostsService {

  error = new Subject<string>();

  fireUrl: string = "https://angular-guide-84051-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http.post<{ name: string }>
      (
        this.fireUrl,
        postData,
        {
          observe: 'body'
        }

      )
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.error.next(error.meassage);
      })
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.fireUrl,
      {
        headers: new HttpHeaders({ 'custom-header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty')
      })
      .pipe(map((response) => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({ ...response[key], id: key });
          }
        }
        return postsArray;
      }),
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      )
  }

  deleteData() {
    return this.http.delete(this.fireUrl, {
      observe: 'events',
      responseType: 'json'
    }).pipe(tap(event => {
      console.log(event);

      if (event.type === HttpEventType.Sent) {
        // console.log(event);
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
