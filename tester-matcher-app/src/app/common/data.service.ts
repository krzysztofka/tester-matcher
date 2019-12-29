import { SearchCriteria } from "./search-criteria";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Page, Pageable } from "./page";
import { Observable } from "rxjs";

const PAGE_RESOURCE_PATH_SUFFIX = "/page";
const PAGE_QUERY_PARAM_NAME = "page";
const SIZE_QUERY_PARAM_NAME = "size";

export class DataService<T> {
  private url: string;
  constructor(resourcePath: string, private http: HttpClient) {
    this.url = `${environment.urlAddress}/${resourcePath}`;
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  public getPage(
    pageable: Pageable,
    searchCriteria?: SearchCriteria
  ): Observable<Page<T>> {
    let queryParams = new HttpParams()
      .append(PAGE_QUERY_PARAM_NAME, pageable.pageNumber.toString())
      .append(SIZE_QUERY_PARAM_NAME, pageable.pageSize.toString());

    if (searchCriteria) {
      queryParams = this.appendSearchCriteria(queryParams, searchCriteria);
    }

    return this.http.get<Page<T>>(this.url + PAGE_RESOURCE_PATH_SUFFIX, {
      params: queryParams
    });
  }

  private appendSearchCriteria(
    params: HttpParams,
    searchCriteria: SearchCriteria
  ): HttpParams {
    let queryParams = params;
    searchCriteria.forEach((property: string, values: string[]) => {
      values.forEach(v => {
        queryParams = queryParams.append(property, v);
      });
    });

    return queryParams;
  }
}
