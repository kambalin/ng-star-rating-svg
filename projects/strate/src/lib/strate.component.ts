import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation, Input, ChangeDetectorRef, forwardRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface IStarDetails {
  star?: number;
  description?: string;
  value?: any;
}

export const STRATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StrateComponent),
  multi: true
};

@Component({
  selector: 'nsrs-strate',
  templateUrl: './strate.component.html',
  styleUrls: ['./strate.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [STRATE_VALUE_ACCESSOR]
})
export class StrateComponent implements OnInit, ControlValueAccessor {

  @Input() readOnly = false;
  @Input() starSize = 0;
  @Input() useFullStars = false;
  @Input() showDescription = false;
  @Input() starsDetails: IStarDetails[] = [];
  @Input() initialRating: number = undefined;

  private _state = {
    rating: 0,
    rated: false
  };
  protected uid: number = Math.floor(Math.random() * 999);
  protected stars;
  public starDescription: string;
  protected settings = {
    totalStars: 5,
    useFullStars: false,
    starShape: 'straight',
    emptyColor: 'lightgray',
    hoverColor: 'orange',
    activeColor: 'gold',
    ratedColor: 'crimson',
    useGradient: true,
    readOnly: false,
    baseUrl: false,
    starGradient: {
      start: '#FEF7CD',
      end: '#FF9511'
    },
    strokeWidth: 4,
    strokeColor: 'black',
    starSize: 40,
    callback: function (rating, elem) { },
    onHover: function (index, rating) { },
    onLeave: function (index, rating) { }
  };
  _value: number;
  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private _elem: ElementRef, private _renderer: Renderer2, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.settings.readOnly = this.readOnly;
    if (this.starSize)
      this.settings.starSize = this.starSize;
    this.settings.useFullStars = this.useFullStars;
    this.renderMarkup();
    this.addListeners();
    if (this.initialRating != undefined) {
      this._value = this.initialRating;
      this.applyRating(this._value);
    }
  }

  ngAfterViewInit() {
  }

  writeValue(value: any): void {
    // Called twice during component initialization, first with null, if need add check for null
    // https://github.com/angular/angular/issues/14988
    this._value = value;
    let starVal = this.getStarByValue();
    this.applyRating(starVal);
    this.cd.detectChanges();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  getStarByValue(): number {
    if (this._value == null)
      return 0;
    if (!this.starsDetails || this.starsDetails.length < 1)
      return this._value;
    return this.starsDetails.filter(x => x.value == this._value)[0].star;
  }

  getStarDescription(starNumber: number): string {
    if (starNumber == null)
      return '';
    if (!this.starsDetails || this.starsDetails.length < 1)
      return '';
    return this.starsDetails.filter(x => x.star == starNumber)[0].description;
  }

  getValueByStar(): number {
    if (!this.starsDetails || this.starsDetails.length < 1)
      return this._state.rating;
    return this.starsDetails.filter(x => x.star == this._state.rating)[0].value;
  }

  getStarContent(index: number) {
    var s = this.settings;

    var star = '<div class="strate-star" data-index="' + index + '" style="width:' + s.starSize + 'px;  height:' + s.starSize + 'px;"><svg version="1.0" class="strate-star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" ' + this.getSvgDimensions(s.starShape) + ' stroke-width:' + s.strokeWidth + 'px;" xml:space="preserve">' +
      this.getVectorPath(this.uid, {
        starShape: s.starShape,
        strokeWidth: s.strokeWidth,
        strokeColor: s.strokeColor
      }) +
      '</svg></div>';
    return star;
  }

  renderMarkup() {
    // inject svg markup
    var starsMarkup = '';
    for (var i = 0; i < this.settings.totalStars; i++) {
      starsMarkup += this.getStarContent(i);
    }    
    let newDiv = this._renderer.createElement('div');
    newDiv.innerHTML = starsMarkup;

    let starContainer = this._elem.nativeElement.querySelectorAll('.star-content')[0];
    this._renderer.appendChild(starContainer, newDiv);
    this.stars = starContainer.querySelectorAll('.strate-star');
  };

  getVectorPath(id, attrs) {
    return (attrs.starShape === 'rounded') ? this.getRoundedVectorPath(id, attrs) : this.getSpikeVectorPath(id, attrs);
  };

  getSpikeVectorPath(id, attrs) {
    return '<polygon data-side="center" class="svg-empty-' + id + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 " style="fill: transparent; stroke: ' + attrs.strokeColor + ';" />' +
      '<polygon data-side="left" class="svg-empty-' + id + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke-opacity: 0;" />' +
      '<polygon data-side="right" class="svg-empty-' + id + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-opacity: 0;" />';
  };

  getRoundedVectorPath(id, attrs) {
    var fullPoints = 'M520.9,336.5c-3.8-11.8-14.2-20.5-26.5-22.2l-140.9-20.5l-63-127.7 c-5.5-11.2-16.8-18.2-29.3-18.2c-12.5,0-23.8,7-29.3,18.2l-63,127.7L28,314.2C15.7,316,5.4,324.7,1.6,336.5S1,361.3,9.9,370 l102,99.4l-24,140.3c-2.1,12.3,2.9,24.6,13,32c5.7,4.2,12.4,6.2,19.2,6.2c5.2,0,10.5-1.2,15.2-3.8l126-66.3l126,66.2 c4.8,2.6,10,3.8,15.2,3.8c6.8,0,13.5-2.1,19.2-6.2c10.1-7.3,15.1-19.7,13-32l-24-140.3l102-99.4 C521.6,361.3,524.8,348.3,520.9,336.5z';

    return '<path data-side="center" class="svg-empty-' + id + '" d="' + fullPoints + '" style="stroke: ' + attrs.strokeColor + '; fill: transparent; " /><path data-side="right" class="svg-empty-' + id + '" d="' + fullPoints + '" style="stroke-opacity: 0;" /><path data-side="left" class="svg-empty-' + id + '" d="M121,648c-7.3,0-14.1-2.2-19.8-6.4c-10.4-7.6-15.6-20.3-13.4-33l24-139.9l-101.6-99 c-9.1-8.9-12.4-22.4-8.6-34.5c3.9-12.1,14.6-21.1,27.2-23l140.4-20.4L232,164.6c5.7-11.6,17.3-18.8,30.2-16.8c0.6,0,1,0.4,1,1 v430.1c0,0.4-0.2,0.7-0.5,0.9l-126,66.3C132,646.6,126.6,648,121,648z" style="stroke: ' + attrs.strokeColor + '; stroke-opacity: 0;" />';
  };

  getSvgDimensions(starShape) {
    return (starShape === 'rounded') ? 'width="550px" height="500.2px" viewBox="0 146.8 550 500.2" style="enable-background:new 0 0 550 500.2;' : 'x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305;';
  };

  addListeners() {
    if (this.settings.readOnly)
      return;
    this.stars.forEach((item) => {
      item.addEventListener('mouseover', (event) => {
        this.hoverRating(event);
      });
    });
    this.stars.forEach((item) => {
      item.addEventListener('mouseout', (event) => {
        this.restoreState(event);
      });
    });
    this.stars.forEach((item) => {
      item.addEventListener('click', (event) => {
        this.handleRating(event);
      });
    });
  };

  // apply styles to hovered stars
  hoverRating(e) {    
    var index = this.getIndex(e);    
    this.paintStars(index, 'hovered');    
    // UNDO
    this.settings.onHover(index + 1, this._state.rating);
  };

  // clicked on a rate, apply style and state
  handleRating(e) {
    let index = this.getIndex(e);
    let rating: number = index + 1;    
    this.applyRating(rating);
    this._value = this.getValueByStar();
    this.onModelChange(this._value);
    this.onModelTouched();
    this.executeCallback(rating, this._elem);
  };

  executeCallback(rating, el) {
    var callback = this.settings.callback;
    callback(rating, el);
  }

  applyRating(rating) {
    var index = rating - 1;
    // paint selected and remove hovered color
    this.paintStars(index, 'rated');
    this._state.rating = rating;
    this._state.rated = true;
  };

  restoreState(e) {
    var index = this.getIndex(e);
    var rating = this._state.rating || -1;
    // determine star color depending on manually rated
    var colorType = this._state.rated ? 'rated' : 'active';
    this.paintStars(rating - 1, colorType);
    this.settings.onLeave(index + 1, this._state.rating);
  };

  getIndex(e): number {    
    var target = e.currentTarget;    
    let width = target.clientWidth;    
    let side = e.target.attributes["data-side"];
    if (side)
      side = side.value;    
    // hovered outside the star, calculate by pixel instead
    side = (!side) ? this.getOffsetByPixel(e, target, width) : side;
    side = (this.settings.useFullStars) ? 'right' : side;

    // get index for half or whole star    
    let index = target.attributes["data-index"].value - ((side === 'left') ? 0.5 : 0);

    // pointer is way to the left, rating should be none
    index = (index < 0.5 && (e.offsetX < width / 4)) ? -1 : index;    
    return index;
  };  

  getOffsetByPixel(e, target, width) {    
    var leftOffset = this.elemOffset(target).left;
    var leftX = e.pageX - leftOffset;    
    return (leftX <= (width / 2) && !this.settings.useFullStars) ? 'left' : 'right';
  };
  
  paintStars(endIndex, stateClass) {    
    var polygonLeft;
    var polygonRight;
    var leftClass;
    var rightClass;
    this.stars.forEach((star, index) => {
      let polygonLeft = star.querySelector('[data-side="left"]');
      let polygonRight = star.querySelector('[data-side="right"]');
      let leftClass = rightClass = (index <= endIndex) ? stateClass : 'empty';

      // has another half rating, add half star
      leftClass = (index - endIndex === 0.5) ? stateClass : leftClass;

      polygonLeft.setAttribute('class', 'svg-' + leftClass + '-' + this.uid);
      polygonRight.setAttribute('class', 'svg-' + rightClass + '-' + this.uid);
      
      if (this.showDescription) {
        if ((endIndex + 1) >= 0)
          this.starDescription = this.getStarDescription(endIndex + 1);
        else
          this.starDescription = this.getStarDescription(0);
      }
    });
  };

  /* required helpers from jQuery */

  elemOffset(elem) {
    let docElem, win, rect, doc;

    if (!elem) {
      return;
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if (rect.width || rect.height || elem.getClientRects().length) {
      doc = elem.ownerDocument;
      win = this.getWindow(doc);
      docElem = doc.documentElement;

      return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
      };
    }
  }

  getWindow(elem) {
    return this.isWindow(elem) ?
      elem :
      elem.nodeType === 9 ?
        elem.defaultView || elem.parentWindow :
        false;
  }

  isWindow(obj) {
    return obj != null && obj == obj.window;
  }
  
  /* */

}
