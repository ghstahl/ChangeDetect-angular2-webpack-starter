import { Component,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from '../shared/services/data.service';
import { ItemsService} from '../shared/utils/items.service';
import { ConfigService } from '../shared/utils/config.service';
import {IUser} from "../shared/interfaces";
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <h1>About</h1>
    <div  >
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let user of users">
                <td> {{user.id}}</td>
                <td>{{user.name}}</td>
            </tr>
        </tbody>
    </table>

    </div>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
  `
})
export class About {
  localState;
  private users:IUser[];
  private userLoaded:boolean;
  constructor(public route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private dataService:DataService,
              private itemsService: ItemsService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
      this.dataService.getUsers()
      .subscribe((res: IUser[]) => {
          this.users = this.itemsService.getSerialized<IUser[]>(res);
          this.userLoaded = true;
          console.log(this.users);
       //  this.ref.detectChanges();
        },
        error => {
          console.log('Failed to load schedule. ' + error);
        });
    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
