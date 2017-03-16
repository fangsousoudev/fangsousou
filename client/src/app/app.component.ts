import { Component } from '@angular/core';
import { TestService } from './test.service';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	heroes: Hero[];
	constructor(private testService: TestService) {

	}

	getHeroes(): void {
		this.testService.getListInfo().then(heroes=>this.heroes = heroes);
  	}

  	ngOnInit(): void {
	    this.getHeroes();
	}
  title = 'app works!';
}
