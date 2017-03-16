import { Injectable } from '@angular/core';
import {HEROES} from './mock-list';
import { Hero } from './hero';

@Injectable()
export class TestService {

  constructor() { }

  getListInfo(): Promise<Hero[]>{
  	return Promise.resolve(HEROES);
  }

}
