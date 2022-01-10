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

* Install package
```
npm install nsrs-strating
```
* Import the StratingModule into your app module (app.module.ts) and add it to the imports array to make the `nsrs-strating` component available within your Angular module.

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
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StratingModule } from 'nsrs-strating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StratingModule,
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
  <nsrs-strating [initialRating]="2" [(ngModel)]="myRating"></nsrs-strating>
  <h1 *ngIf="myRating">
    Rated to {{ myRating }}
  </h1>
</div>

<router-outlet></router-outlet>
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
  title = 'strating-test';
  myRating: number = 0;
}
```