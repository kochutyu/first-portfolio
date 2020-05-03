import { IPortfolioImg } from './portfolio-img.interface';

export interface IPortfolioWork{
    id: number;
    showDemo: string;
    slider: IPortfolioImg[],
    deleteID?: string;
}