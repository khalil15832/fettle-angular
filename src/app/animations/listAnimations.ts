import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

const listAnimation = [
  trigger('listAnimation', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(40px)' }),
          stagger(
            '50ms',
            animate(
              '150ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
];

export default listAnimation;
