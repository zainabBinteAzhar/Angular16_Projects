import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css'],
  animations: [
    // 1. Fade In/Out Animation
    trigger('fadeInOut', [
      transition(':enter', [
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),

    // 2. State-Based Transition Animation
    trigger('stateTransition', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive <=> active', animate('1s'))
    ]),

    // 3. Slide In/Out Animation
    trigger('slideInOut', [
      transition(':enter', [
        animate('500ms', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms', style({ transform: 'translateX(-100%)' }))
      ])
    ]),

    // 4. Staggered List Animation
    trigger('staggeredList', [
      transition(':enter', [
        query('.item', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          stagger('0.2s', [
            animate('0.5s', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),

    // 5. Bounce Animation
    trigger('bounce', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-30px)', offset: 0.25 }),
          style({ transform: 'translateY(0)', offset: 0.5 }),
          style({ transform: 'translateY(-15px)', offset: 0.75 }),
          style({ transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ]),

    // 6. Flip Animation
    trigger('flip', [
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      state('normal', style({
        transform: 'rotateY(0)'
      })),
      transition('normal <=> flipped', animate('500ms ease-in-out'))
    ]),

    // 7. Rotate Animation
    trigger('rotate', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(180deg)', offset: 0.5 }),
          style({ transform: 'rotate(360deg)', offset: 1 })
        ]))
      ])
    ]),

    // 8. Collapse/Expand Animation
    trigger('collapseExpand', [
      state('collapsed', style({
        height: '0px',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class TestComponent {
  isVisible = true;
  isActive = true;
  isFlipped = false;
  isCollapsed = false;
  items = [1, 2, 3];

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  toggleState() {
    this.isActive = !this.isActive;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
