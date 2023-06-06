import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Anuncio } from 'anuncio';

@Injectable({
  providedIn: 'root'
})
export class TransmissaoService {

  private anuncioData: BehaviorSubject<Anuncio[]> = new BehaviorSubject<Anuncio[]>([]);
  constructor() { }

  setAnuncioData(data: Anuncio[]): void {
    this.anuncioData.next(data);
  }

  getAnuncioData(): Observable<Anuncio[]> {
    return this.anuncioData.asObservable();
  }
}
