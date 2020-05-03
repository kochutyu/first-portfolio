
import { IAboutSlill } from '../interfaces/about-skill.interface';

export class AboutSlill implements IAboutSlill {
    constructor(
        public logo: string,
        public text: string,
        public header: string
    ) { }
}