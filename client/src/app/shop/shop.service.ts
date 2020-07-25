import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }
  // getProducts(brandId?: number, typeId?: number, sort?: string ){
  getProducts(shopParams: ShopParams){
  let params = new HttpParams();

  if (shopParams.brandId !== 0){
    params = params.append('brandId', shopParams.brandId.toString());
  }

  if (shopParams.typeId !== 0){
    params = params.append('typeId', shopParams.typeId.toString());
  }

  if (shopParams.search){
    params = params.append('search', shopParams.search);
  }
  params = params.append('sort', shopParams.sort);
  params = params.append('pageIndex', shopParams.pageNumber.toString());
  params = params.append('pageSize', shopParams.pageSize.toString());


  return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(  // It is a wrapper areound any rxjs operators that we want to use and we can chain multiple rxjs operator like delay, map
      // delay(1000), To delay the response for any reason
      map(response => { // To map HttpResponse to IPagination
         return response.body; // return IPagination object
      })
    );
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}





