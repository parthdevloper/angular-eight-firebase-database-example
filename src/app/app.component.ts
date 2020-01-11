import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,  delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedPost: {username: string; name: string; SpecialWord: string }[] = [];
  title = 'http-ten-app';
  dataPosted = false;
  accessData = false;

  onSubmit(postData: {username: string; name: string; SpecialWord: string ; } ) {
    // console.log(postData );
    let x = this.http.post('https://fir-angular-app-5f7f0.firebaseio.com/postData.json', postData).subscribe(dataName =>{
      // console.log(dataName);

    });
    // console.log(x);

    this.dataPosted = true;

  }
  constructor(private http: HttpClient){
    // console.log("constructor called");
  }

   onfetch(){

    this.accessData = true;
    this.http.get<{ [key: string] : {username: string; name: string; SpecialWord: string  }}>('https://fir-angular-app-5f7f0.firebaseio.com/postData.json')
    .pipe(
      map( (responseData: {[key: string]: {username: string; name: string; SpecialWord: string ; }})  => {
      const postArray = [];
      for(const key in responseData){
        postArray.push({...responseData[key], id: key});
      }
      return postArray;
    }), delay(3000))
    .subscribe(fetchData => {
      this.accessData = false;
      // console.log(fetchData);
      this.loadedPost = fetchData;
    });

    // setTimeout(() => {
    //   // JSON.stringify(this.loadedPost.pop());
    //   console.log(this.loadedPost.pop());

    // }, 1000);
  }

  // delete post

  deletePost(){
    this.http.delete('https://fir-angular-app-5f7f0.firebaseio.com/postData.json').subscribe(() => {
      this.loadedPost = [];
    })
  }

  ngOnInit(){
    // this.onfetch();

    // console.log("int called");

  }
}
