import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDTO } from '../model/item.dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly baseUrl:string='http://localhost:8080/items';

  constructor(private httpClient:HttpClient){}
 // fetchAllItems() : Observable<ItemDTO[]> {
  //  return this.httpClient.get<ItemDTO[]>(this.baseUrl);
/// return this.httpClient.get<HalResponse>('http://localhost:8080/items');
 
 fetchAllItems() : Observable<HalResponse> {
return this.httpClient.get<HalResponse>(this.baseUrl);
}
}
export interface HalResponse {
  _embedded: {
    items: ItemDTO[];
  };
  _links: any;
  page: any;
}