import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApiService} from '../base-api/base-api.service';
import {Item} from "../../models/item.model";


@Injectable()
export class ItemApiService {
  private readonly basePath = 'api/market';

  constructor(private readonly apiService: BaseApiService) {
  }

  public getItems(): Observable<Item[]> {
  }

  public getItemById(itemId: string): Observable<Item> {
  }


  public updateItemName(payload: {
    item_id: string;
    newName: string;
  }): Observable<void> {

  }

  public deleteItem(itemId: string): Observable<void> {
  }
}
