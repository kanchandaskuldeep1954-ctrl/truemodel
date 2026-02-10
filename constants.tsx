import { Part } from './types';
import { Layer0 } from './components/content/Layer0';
import { Layer1 } from './components/content/Layer1';
import { Layer2 } from './components/content/Layer2';
import { Layer3 } from './components/content/Layer3';
import { Layer4 } from './components/content/Layer4';
import { Layer5 } from './components/content/Layer5';
import { Layer6 } from './components/content/Layer6';
import { Layer7 } from './components/content/Layer7';
import { Layer8 } from './components/content/Layer8';
import { Layer9 } from './components/content/Layer9';
import { Layer10 } from './components/content/Layer10';

export const COURSE_DATA: Part[] = [
  {
    id: 'part1',
    title: 'Part 1: The Foundation',
    modules: [
      Layer0,
      Layer1,
      Layer2
    ]
  },
  {
    id: 'part2',
    title: 'Part 2: The Learning Machine',
    modules: [
      Layer3,
      Layer4,
      Layer5
    ]
  },
  {
    id: 'part3',
    title: 'Part 3: Vision & Sequences',
    modules: [
      Layer6,
      Layer7
    ]
  },
  {
    id: 'part4',
    title: 'Part 4: The Transformer Age',
    modules: [
      Layer8,
      Layer9,
      Layer10
    ]
  }
];
