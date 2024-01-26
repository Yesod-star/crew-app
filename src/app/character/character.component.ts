import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Character } from '../Character';
import { CharactersService } from '../character.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RaceEnum } from '../Enum/RaceEnum';
import { classRpgsService } from '../classrpg.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'] 
})
export class CharacterComponent implements OnInit {
  form : any;
  titleForm!: string;
  characters!: Character[];
  Name!: string;
  characterid!: number;
  modalRef!: BsModalRef;
  classNames: string[] = [];

  visibilityTable: boolean = true;
  formVisibility: boolean = false; 

  formulario: FormGroup;
  classVar: any[] = [];
  raceOptions: any[] = []; 

  constructor(private fb: FormBuilder,private charactersService:CharactersService, private modalService: BsModalService, private classRpgsService: classRpgsService){
    this.formulario = this.fb.group({
      classRpgId: ['', Validators.required],
      race: ['', Validators.required]
    });
  }

    ngOnInit() : void {
      this.charactersService.ListAll().subscribe(result => {
      this.characters = result;

      
      const classObservables = this.characters.map(character => this.getClassName(character));

      forkJoin(classObservables).subscribe(classNames => {
        this.classNames = classNames;
      });

      this.charactersService.getRaceOptions().subscribe((result) => {
        this.raceOptions = result;
      });

      this.classRpgsService.ListAll().subscribe((result) => {
        this.classVar = result;
      });

    })

    this.titleForm = "New Character"
    this.form = new FormGroup({
      Name: new FormControl(null),
      race: new FormControl(null),
      Player: new FormControl(null),
      Age: new FormControl(null),
      classRpgId: new FormControl(null),
      Backstory: new FormControl(null)
    })
  }

  showForm():void{
    this.visibilityTable = false;
    this.formVisibility = true;
    this.titleForm = 'New Character';
    this.form = new FormGroup({
      Name: new FormControl(null),
      race: new FormControl(null),
      Player: new FormControl(null),
      Age: new FormControl(null),
      classRpgId: new FormControl(null),
      Backstory: new FormControl(null)
    });
  }

  formUpdate(characterid: any): void{
    this.visibilityTable = false;
    this.formVisibility = true;

    this.charactersService.GetById(characterid).subscribe(result => {
      this.titleForm = `Updating ${result.name}`;

      this.form = new FormGroup({
        characterId: new FormControl(result.characterId),
        Name: new FormControl(result.name),
        race: new FormControl(this.mapEnumToRace(result.race)),
        Player: new FormControl(result.player),
        Age: new FormControl(result.age),
        classRpgId: new FormControl(result.classRpgId),
        Backstory: new FormControl(result.backstory)
      })
    })
  }

  Back():void{
    this.visibilityTable = true;
    this.formVisibility = false;
  }

  RemoveConfirmation(characterid: number,Name: string,conteudoModal:TemplateRef<any>):void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.characterid = characterid;
    this.Name = Name;
  }

  
  RemoveChar(characterid:number){
    this.charactersService.RemoveCharacter(characterid).subscribe(resultado => {
      this.modalRef.hide();
      this.charactersService.ListAll().subscribe(registros => {
        this.characters = registros;
      })
    });
  }

  SendForm(): void {
    const character: Character = this.form.value;
    character.race = this.mapRaceToEnum(this.form.value.race);
    if (character.characterId > 0) {
      this.charactersService.UpdateCharacter(character).subscribe((resultado) => {
        this.formVisibility = false;
        this.visibilityTable = true;
        this.charactersService.ListAll().subscribe((registros) => {
          this.characters = registros;
        });
      });
    } else {
      this.charactersService.SaveCharacter(character).subscribe((resultado) => {
        this.formVisibility = false;
        this.visibilityTable = true;
        this.charactersService.ListAll().subscribe((registros) => {
          this.characters = registros;
        });
      });
    }
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  getRaceName(raceValue: number): string {
    return RaceEnum[raceValue];
  }

  getClassName(character: Character): Observable<string> {
    return this.classRpgsService.GetById(character.classRpgId).pipe(
      map(selectedClass => selectedClass ? selectedClass.name : 'Unknown'),
      catchError(error => {
        console.error('Error fetching class by ID', error);
        return of('Unknown');
      })
    );
  }

  getAllRaceNames(): string[] {
    return Object.keys(RaceEnum).filter(key => isNaN(Number(key)));
  }
  
  mapRaceToEnum(race: string): number {
    switch (race) {
        case 'Human':
            return RaceEnum.Human;
        case 'Elf':
            return RaceEnum.Elf;
        case 'Dwarf':
            return RaceEnum.Dwarf;
        case 'Halfling':
            return RaceEnum.Halfling;
        case 'Breton':
            return RaceEnum.Breton;
        case 'Orc':
            return RaceEnum.Orc;
        case 'Tiefling':
            return RaceEnum.Tiefling;
        case 'Dragonborn':
            return RaceEnum.Dragonborn;
        case 'Gnome':
            return RaceEnum.Gnome;
        default:
            // You might want to handle the case when the race is not found
            console.error('Invalid race:', race);
            return -1; // or throw an error, or handle it according to your needs
    }
  }

  mapEnumToRace(enumValue: number): string {
    switch (enumValue) {
        case RaceEnum.Human:
            return 'Human';
        case RaceEnum.Elf:
            return 'Elf';
        case RaceEnum.Dwarf:
            return 'Dwarf';
        case RaceEnum.Halfling:
            return 'Halfling';
        case RaceEnum.Breton:
            return 'Breton';
        case RaceEnum.Orc:
            return 'Orc';
        case RaceEnum.Tiefling:
            return 'Tiefling';
        case RaceEnum.Dragonborn:
            return 'Dragonborn';
        case RaceEnum.Gnome:
            return 'Gnome';
        default:
            // You might want to handle the case when the enum value is not found
            console.error('Invalid enum value for race:', enumValue);
            return 'Unknown'; // or throw an error, or handle it according to your needs
    }
}
  
}
