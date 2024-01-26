
import { RaceEnum } from './Enum/RaceEnum';

export class Character {
    characterId: number;
    name: string;
    race: RaceEnum;
    player: string;
    age: number;
    backstory: string;
    classRpgId : number;

    constructor(characterId: number, name: string, race: RaceEnum, player: string, age: number, backstory: string, classRpgId : number) {
        this.characterId = characterId;
        this.name = name;
        this.race = race;
        this.player = player;
        this.age = age;
        this.backstory = backstory;
        this.classRpgId = classRpgId;
    }
}
