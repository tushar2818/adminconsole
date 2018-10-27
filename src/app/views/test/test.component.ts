import { Component, ViewChild, ChangeDetectionStrategy, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TestService } from './test.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Person {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  disabled?: boolean;
}

export class DataService {
  constructor() { }
  
  getPeople(term: string = null): Observable<Person[]> {
    let items = this.getMockPeople();
    if (term) {
      items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  } 
  getMockPeople() {
    return [
      {
        'id': '5a15b13c36e7a7f00cf0d7cb',
        'index': 2,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 23,
        'name': 'Karyn Wright',
        'gender': 'female',
        'company': 'ZOLAR',
        'email': 'karynwright@zolar.com',
        'phone': '+1 (851) 583-2547'
      },
      {
        'id': '5a15b13c2340978ec3d2c0ea',
        'index': 3,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 35,
        'name': 'Rochelle Estes',
        'disabled': true,
        'gender': 'female',
        'company': 'EXTRAWEAR',
        'email': 'rochelleestes@extrawear.com',
        'phone': '+1 (849) 408-2029'
      },
      {
        'id': '5a15b13c663ea0af9ad0dae8',
        'index': 4,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 25,
        'name': 'Mendoza Ruiz',
        'gender': 'male',
        'company': 'ZYTRAX',
        'email': 'mendozaruiz@zytrax.com',
        'phone': '+1 (904) 536-2020'
      },
      {
        'id': '5a15b13cc9eeb36511d65acf',
        'index': 5,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 39,
        'name': 'Rosales Russell',
        'gender': 'male',
        'company': 'ELEMANTRA',
        'email': 'rosalesrussell@elemantra.com',
        'phone': '+1 (868) 473-3073'
      },
      {
        'id': '5a15b13c728cd3f43cc0fe8a',
        'index': 6,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'name': 'Marquez Nolan',
        'gender': 'male',
        'company': 'MIRACLIS',
        'disabled': true,
        'email': 'marqueznolan@miraclis.com',
        'phone': '+1 (853) 571-3921'
      },
      {
        'id': '5a15b13ca51b0aaf8a99c05a',
        'index': 7,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 28,
        'name': 'Franklin James',
        'gender': 'male',
        'company': 'CAXT',
        'email': 'franklinjames@caxt.com',
        'phone': '+1 (868) 539-2984'
      },
      {
        'id': '5a15b13cc3b9381ffcb1d6f7',
        'index': 8,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'name': 'Elsa Bradley',
        'gender': 'female',
        'company': 'MATRIXITY',
        'email': 'elsabradley@matrixity.com',
        'phone': '+1 (994) 583-3850'
      },
      {
        'id': '5a15b13ce58cb6ff62c65164',
        'index': 9,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 40,
        'name': 'Pearson Thompson',
        'gender': 'male',
        'company': 'EZENT',
        'email': 'pearsonthompson@ezent.com',
        'phone': '+1 (917) 537-2178'
      },
      {
        'id': '5a15b13c90b95eb68010c86e',
        'index': 10,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'name': 'Ina Pugh',
        'gender': 'female',
        'company': 'MANTRIX',
        'email': 'inapugh@mantrix.com',
        'phone': '+1 (917) 450-2372'
      },
      {
        'id': '5a15b13c2b1746e12788711f',
        'index': 11,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 25,
        'name': 'Nguyen Elliott',
        'gender': 'male',
        'company': 'PORTALINE',
        'email': 'nguyenelliott@portaline.com',
        'phone': '+1 (905) 491-3377'
      },
      {
        'id': '5a15b13c605403381eec5019',
        'index': 12,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'name': 'Mills Barnett',
        'gender': 'male',
        'company': 'FARMEX',
        'email': 'millsbarnett@farmex.com',
        'phone': '+1 (882) 462-3986'
      },
      {
        'id': '5a15b13c67e2e6d1a3cd6ca5',
        'index': 13,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 36,
        'name': 'Margaret Reynolds',
        'gender': 'female',
        'company': 'ROOFORIA',
        'email': 'margaretreynolds@rooforia.com',
        'phone': '+1 (935) 435-2345'
      },
      {
        'id': '5a15b13c947c836d177aa85c',
        'index': 14,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'name': 'Yvette Navarro',
        'gender': 'female',
        'company': 'KINETICA',
        'email': 'yvettenavarro@kinetica.com',
        'phone': '+1 (807) 485-3824'
      },
      {
        'id': '5a15b13c5dbbe61245c1fb73',
        'index': 15,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 20,
        'name': 'Elisa Guzman',
        'gender': 'female',
        'company': 'KAGE',
        'email': 'elisaguzman@kage.com',
        'phone': '+1 (868) 594-2919'
      },
      {
        'id': '5a15b13c38fd49fefea8db80',
        'index': 16,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 33,
        'name': 'Jodie Bowman',
        'gender': 'female',
        'company': 'EMTRAC',
        'email': 'jodiebowman@emtrac.com',
        'phone': '+1 (891) 565-2560'
      },
      {
        'id': '5a15b13c9680913c470eb8fd',
        'index': 17,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'name': 'Diann Booker',
        'gender': 'female',
        'company': 'LYRIA',
        'email': 'diannbooker@lyria.com',
        'phone': '+1 (830) 555-3209'
      }
    ];
  }
}

@Component({
  templateUrl: 'test.component.html'
})

export class TestComponent {
 
  people$: Observable<Person[]>;
  people: Person[] = [];
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
  selectedPersonId2 = '5a15b13c36e7a7f00cf0d7cb';

  selectedSimpleItem = 'Two';
  simpleItems = [];
  disable = true;
  dataService: DataService;
  selectedCarId = 3;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ]
  public citys: any = [];

  people2: Person[] = [];
  selectedPeople = [];
  selectedPeople2 = [];
  dtOptions: DataTables.Settings = {};

  constructor(
    private _service: TestService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.dataService = new DataService();
  }

  showSuccess() {
    debugger;
    this.toastr.success('Hello world!', 'Toastr fun!');

    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000
    });
  }

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
    this.dataService.getPeople().subscribe(items => this.people = items);
    this.simpleItems = [true, 'Two', 3];
    //this.refreshDataSource();

    this.dataService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((res) => {
        this.people2 = res;
        this.selectedPeople = [this.people2[0].id, this.people2[1].id];
      });

    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    $('#example').DataTable();
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
  }

  refreshDataSource() {
    this._service.get().subscribe(item => {
      debugger;
      if (item.IsSuccess) {
        this.citys = item.Result; 
      } 
    }); 
  }

}
