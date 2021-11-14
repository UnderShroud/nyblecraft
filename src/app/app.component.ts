import { Component,  OnInit,  } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { DataService } from './services/data.service';
import { FormBuilder } from '@angular/forms';
import { Note } from './types/types';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'nyblecraft';
  formWrapper: FormGroup = this._fb.group([])
  form: FormArray

  ngOnInit(): void {
    this.getForm()
    this.formWrapper = this._fb.group(this.form)
    this.form.controls
    console.log('this.form.controls: ', this.form);
  }
  
  constructor(private _data: DataService, private _fb: FormBuilder) {
  this.form = this._createForm()
  }

  onClick(): void {
    this._data.postData({header: 'First note', content: 'Bla-bla #nice'}).subscribe(data => console.log(data))
  }

  private _createForm() {
    return this._fb.array([])
  }

  public createFormGroup(note: Note) {
    return this._fb.group({
      header: note.header || '(No header)',
      content: [note.content, Validators.required],
      tags: [note.tags || []]
    })
  }

  getForm() {
    this._data.getData().subscribe((data: Note[]) => {
    const form = this.form
    form.clear()
    data.forEach((note: Note) => {
      form.push(this.createFormGroup(note))
    });
    console.log('Finished: ', this.form);
    })
  }

  formGet(): FormArray{
    return this.form
  }

  tags(index: number): any {
    return this.form.get([index])?.get('tags')
  }

  onSubmit() {

  }
  noteClick(event: any) {
    console.log('event: ', event);
  }

  removeByIndex(index: number) {
    this.formGet().removeAt(index);
  }

  disableByIndex(index: number) {
    this.form.get([index])?.disable();
  }

  action(){
    this.tags(3)
    console.log('this.tags(4): ', this.tags(3));
  }
}
