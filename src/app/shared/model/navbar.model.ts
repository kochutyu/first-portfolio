import { INavbar } from '../interfaces/navbar.interface';

export class Navbar implements INavbar{
    constructor(
        public dataTitle: string,
        public href: string,
        public fIcon: string
    ){}
}