import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../interfaces/user';


export class UsersDataSource implements DataSource<User> {

  tipoUser = [
    { name: "Usuario", value: "USER" },
    { name: "Usuario Mayorista", value: "UMAY" },
    { name: "Administrador", value: "ADM" },

  ]


  private usersSubject = new BehaviorSubject<User[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);



  public loading$ = this.loadingSubject.asObservable();


  constructor(private userServices: UserService) { }


  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(filter = '', sortDirection = 'asc', pageIndex = 1, pageSize = 20) {

    this.loadingSubject.next(true);
    this.userServices.findUsers(filter, sortDirection, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((users: any) => {
        console.log(users);
        const data = users.data.map((a: any) => {
          let role = this.tipoUser.filter(x => x.value === a.role).map(v => v.name)[0]
          console.log(role);
          a.roleName = role

          return a
        })
        this.usersSubject.next(data)
      })

  }
}