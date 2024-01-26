import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { classRpg } from '../classRpg';
import { classRpgsService } from '../classrpg.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-classrpg',
  templateUrl: './classrpg.component.html',
  styleUrl: './classrpg.component.css'
})

export class classRpgComponent implements OnInit {
  form: any;
  titleForm!: string;
  classesrpg!: classRpg[];
  classRpgId!: number;
  modalRef!: BsModalRef;
  nameClass!: string;

  tableVisibility: boolean = true;
  formVisibility: boolean = false;

  constructor(
    private classRpgsService: classRpgsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.classRpgsService.ListAll().subscribe((resultado) => {
      this.classesrpg = resultado;
    });

    this.titleForm = 'New Class';
    this.form = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  showForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;
    this.titleForm = 'New Class';
    this.form = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  FormUpdate(classRpgId: any): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.classRpgsService.GetById(classRpgId).subscribe((resultado) => {
      this.titleForm = `Updating ${resultado.name}`;
      
      this.form = new FormGroup({
        classRpgId: new FormControl(resultado.classRpgId),
        name: new FormControl(resultado.name),
        description: new FormControl(resultado.description),
      });
    });
  }

  Back(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }

  RemoveConfirmation(classRpgId: number, nameClass: string,conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.classRpgId = classRpgId;
    this.nameClass = nameClass;
  }

  RemoveClass(classRpgId: number): void {
    this.classRpgsService.RemoveClassRpg(classRpgId).subscribe((resultado) => {
      this.modalRef.hide();
      this.classRpgsService.ListAll().subscribe((registros) => {
        this.classesrpg = registros;
      });
    });
  }

  SendForm(): void {
    const classRpg: classRpg = this.form.value;

    if (classRpg.classRpgId > 0) {
      this.classRpgsService.UpdateClassRpg(classRpg).subscribe((resultado) => {
        this.formVisibility = false;
        this.tableVisibility = true;
        this.classRpgsService.ListAll().subscribe((registros) => {
          this.classesrpg = registros;
        });
      });
    } else {
      this.classRpgsService.SaveClassRpg(classRpg).subscribe((resultado) => {
        this.formVisibility = false;
        this.tableVisibility = true;
        this.classRpgsService.ListAll().subscribe((registros) => {
          this.classesrpg = registros;
        });
      });
    }
  }
}