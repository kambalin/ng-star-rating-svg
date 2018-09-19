# NgStarRatingSvg

> Simplified angular  version of https://github.com/nashio/star-rating-svg

A basic star rate angular component, using SVG.

Features:
* Doesn't use external images
* Customize size
* Use half or full stars
* Specify initial rating
* Read-only mode
* Star value description on hover and selection
* Custom selected star value

# How to use?

* Include ```StrateModule``` module in ```app.module.ts```
```javascript
import { StrateModule } from 'projects/strate/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StrateModule //<-- add the module in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* Add the component ```<nsrs-strate>``` where rating part is expected in your application

## Component properties

| property  | default  | description  |
|---|---|---|
| initialRating | 0 | Initial rating applied on load |
| starSize | 40 | width in pixels of each star |
| useFullStars | false | rate using whole stars, if enabled, it doesn't use half-steps |
| readOnly | false | If false any interaction is disabled |
| starsDetails | IStarDetails[] | array |
| showDescription | false | show hovered or selected star value description from starsDetails array |

# Sample implementation

**```app.module.ts```**

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StrateModule } from 'projects/strate/src/public_api';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StrateModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

**```app.component.html```**

```html
<div style="text-align:center">
  <h1>
    Lets rate it!
  </h1>
  <nsrs-strate [initialRating]="2" [(ngModel)]="myRating"></nsrs-strate>
  <h1 *ngIf="myRating">
    Rated to {{ myRating }}
  </h1>
</div>
```

**```app.component.ts```**

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-star-rating-svg';
  myRating: number = 0;
}

```