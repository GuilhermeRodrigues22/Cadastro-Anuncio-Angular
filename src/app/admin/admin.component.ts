import { TransmissaoService } from './../transmissao.service';
import { AnuncioService } from './../anuncio.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Anuncio } from 'anuncio';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  anuncio: Anuncio[] = [];
  isEditing: boolean = false;
  formGroupAnuncio: FormGroup;
  submitted: boolean = false;
  constructor(
    private AnuncioService: AnuncioService,
    private formBuilder: FormBuilder,
    private TransmissaoService: TransmissaoService
  ) {
    this.formGroupAnuncio = formBuilder.group({
      id: [''],
      titulo: [''],
      preco: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      data: [''],
      imagem: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.loadAnuncio();
  }

  loadAnuncio() {
    this.AnuncioService.getAnuncios().subscribe({
      next: (data) => (this.anuncio = data),
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupAnuncio.valid) {
      if (this.isEditing) {
        this.AnuncioService.update(this.formGroupAnuncio.value).subscribe({
          next: () => {
            this.loadAnuncio();
            this.formGroupAnuncio.reset();
            this.isEditing = false;
            this.submitted = false;
          },
        });
      } else {
        this.AnuncioService.save(this.formGroupAnuncio.value).subscribe({
          next: (data) => {
            this.TransmissaoService.setAnuncioData(this.anuncio);
            this.anuncio.push(data);
            this.formGroupAnuncio.reset();
            this.submitted = false;
          },
        });
      }
    }
  }
  editar(anuncio: Anuncio) {
    this.formGroupAnuncio.setValue(anuncio);
    this.isEditing = true;
  }

  delete(anuncio: Anuncio) {
    this.AnuncioService.delete(anuncio).subscribe({
      next: () => this.loadAnuncio(),
    });
  }
  limpar() {
    this.formGroupAnuncio.reset();
    this.submitted = false;
  }

  get title(): any {
    return this.formGroupAnuncio.get('titulo');
  }
  get price(): any {
    return this.formGroupAnuncio.get('preco');
  }
  get description(): any {
    return this.formGroupAnuncio.get('descricao');
  }
  get data(): any {
    return this.formGroupAnuncio.get('data');
  }
  get image(): any {
    return this.formGroupAnuncio.get('imagem');
  }
}
