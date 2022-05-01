import { Section } from './section';

export interface Ingredient {
  id: bigint;
  name: string;
  section: Section;
}
