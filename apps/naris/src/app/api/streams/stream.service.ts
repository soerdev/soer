import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VideoModel } from './stream.model';

@Injectable()
export class StreamService implements Resolve<VideoModel>{

  constructor(private http: HttpClient) {}


  getStreams(): Observable<VideoModel> {
    return this.http.get<VideoModel>(environment.assetsUrl + 'streams.json');
  }
  resolve(): Observable<VideoModel> {
    return this.getStreams();
  }
}
