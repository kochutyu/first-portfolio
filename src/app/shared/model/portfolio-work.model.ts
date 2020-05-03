
import { IPortfolioWork } from '../interfaces/portfolio-work.interface';
import { IPortfolioImg } from '../interfaces/portfolio-img.interface';
export class PortfolioWork implements IPortfolioWork {
    constructor(
        public id: number, 
        public showDemo: string, 
        public slider: IPortfolioImg[], 
        public deleteID?: string
    ) { }
}