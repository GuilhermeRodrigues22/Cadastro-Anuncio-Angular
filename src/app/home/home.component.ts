import { TransmissaoService } from './../transmissao.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anuncio } from 'anuncio';
import { AnuncioService } from '../anuncio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  anuncio: Anuncio[] = [];
  isEditing: boolean = false;
  formGroupAnuncio: FormGroup;
  submitted: boolean = false;

  constructor(private AnuncioService: AnuncioService,
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
      status: [false]
    });
  }
  ngOnInit(): void {
    this.loadAnuncio();
  }

  loadAnuncio() {
    this.AnuncioService.getAnuncios().subscribe({
      next: data => this.anuncio = data
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupAnuncio.valid) {
      if (this.isEditing) {
        this.AnuncioService.update(this.formGroupAnuncio.value).subscribe(
          {
            next: () => {
              this.loadAnuncio();
              this.formGroupAnuncio.reset();
              this.isEditing = false;
              this.submitted = false;
            }
          }
        );
      }
      else {
        this.AnuncioService.save(this.formGroupAnuncio.value).subscribe(
          {
            next: data => {
              this.TransmissaoService.setAnuncioData(this.anuncio);
              this.anuncio.push(data)
              this.formGroupAnuncio.reset();
              this.submitted = false;
            }
          }
        );
      }
    }
  }

  edit(anuncio: Anuncio) {
    this.formGroupAnuncio.setValue(anuncio);
    this.isEditing = true;
  }

  delete(anuncio: Anuncio) {
    this.AnuncioService.delete(anuncio).subscribe(
      {
        next: () => this.loadAnuncio()
      }
    );
  }
  limparDados() {
    this.formGroupAnuncio.reset();
    this.submitted = false;
  }
}
