import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private httpClient: HttpClient) { }

  createPersonal(data: any) {
    return this.httpClient.post('http://localhost:43412/api/Personal/create', data, {headers: new HttpHeaders()});
  }

  getDataList() {
    return this.httpClient.get('http://localhost:43412/api/Personal/getData');
  }

  deleteData(id: any) {
    let params = new HttpParams().set('id', id);
    return this.httpClient.delete('http://localhost:43412/api/Personal/delete', {params: params});
  }
  updatePersonal(data: any) {
    return this.httpClient.post('http://localhost:43412/api/Personal/update', data, {headers: new HttpHeaders()});
  }
}
