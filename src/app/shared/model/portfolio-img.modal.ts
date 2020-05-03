import { IPortfolioImg } from '../interfaces/portfolio-img.interface';

export class PortfolioImg implements IPortfolioImg {
    constructor(
        public urlImg: string,
        public describe: string,
        public header: string
    ) { }
}