import { animate, style, transition, trigger } from '@angular/animations';

const pagePopInAnimation = [
  trigger('fadeIn', [
    transition('void => *', [
      style({ opacity: 0, transform: 'translateY(60px)' }),
      animate('0.5s ease-out'),
    ]),
  ]),
];

export default pagePopInAnimation;