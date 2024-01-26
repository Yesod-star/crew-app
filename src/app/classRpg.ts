
import { RaceEnum } from './Enum/RaceEnum';

export class classRpg {
    classRpgId: number;
    name: string;
    description: string;

    constructor(ClassRpgId: number, Name: string, Description: string) {
        this.classRpgId = ClassRpgId;
        this.name = Name;
        this.description = Description;
    }
}
