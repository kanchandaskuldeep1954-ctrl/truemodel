
export interface LessonStep {
  id: string;
  type: 'animation' | 'interactive' | 'challenge' | 'text';
  title: string;
  content: string; // Description or text content
  componentId?: string; // ID for specific interactive component (e.g., 'binary-switches')
  config?: any; // serialized config for the component
  requiredToAdvance: boolean;
  // Code Challenge Fields
  initialCode?: string;
  expectedOutput?: string;
  hints?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  steps?: LessonStep[]; // New structured content (optional during migration)
  content?: string; // Legacy support (optional)
  interactiveType?: string; // Legacy support
  code?: string;
  xpReward: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Part {
  id: string;
  title: string;
  modules: Module[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
