import { IAboutInfo } from '../interfaces/about-info.interface';
import { IPortfolioImg } from '../interfaces/portfolio-img.interface';

export class AboutInfo implements IAboutInfo {
    constructor(
        public header: string,
        public text: string,
        public slider: IPortfolioImg[],
    ) { }
}