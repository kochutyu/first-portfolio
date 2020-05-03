import { IPortfolioImg } from './portfolio-img.interface';

export interface IAboutInfo{
    header: string;
    text: string;
    slider: IPortfolioImg[];
    id?: number;
}