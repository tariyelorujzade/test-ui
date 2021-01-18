import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public form:FormGroup;
  public identityPhotoId = [];
  public photos = []
  public martyrName;
  public childImage;
  public childFilesAmount;
  public home;
  constructor(public fb: FormBuilder,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:[null,[Validators.required,Validators.minLength(2)]],
      surname:[null,[Validators.required,Validators.minLength(2)]],
      fathername:[null,[Validators.required,Validators.minLength(2)]],
      birthdate:[null,[Validators.required,Validators.minLength(2)]],
      fin:[null,[Validators.required,Validators.minLength(7)]],
      familyAddress:[null,[Validators.required,Validators.minLength(2)]],
      dateOfMartyrdomOrVeteran:[null,[Validators.required,Validators.minLength(2)]],
      regionId:[null,[Validators.required,Validators.minLength(2)]],
      identityPhotoId:[null,[Validators.required,Validators.minLength(2)]],
      contactInfo:[null,[Validators.required,Validators.minLength(2)]],
      children: this.fb.array([
           this.fb.group({
            name:[null,[Validators.required,Validators.minLength(2)]],
            surname:[null,[Validators.required,Validators.minLength(2)]],
            fin:[null,[Validators.required,Validators.minLength(7)]],
            birthdate:[null,[Validators.required,Validators.minLength(2)]],
            gender:[null,[Validators.required,Validators.minLength(2)]],
            identityPhotoId:[null,[Validators.required,Validators.minLength(2)]],
           })
      ]),
      rewards: this.fb.array([
        this.fb.group({
          name:[null,[Validators.required,Validators.minLength(2)]],
          date:[null,[Validators.required,Validators.minLength(2)]],
        })
      ]),
      apartments: this.fb.array([
       this.fb.group({
        peopleCount:'',
        totalArea:'',
        roomCount:'',
        hasDocument:'',
        photos: this.fb.array([ ])
       })

      ])


    })
   // this.apartments = this.form.controls.apartments as FormArray  //  apartmenst ssssssssssssssssss
  }

  public addChild(){
    let children = this.form.controls.children as FormArray;
    children.push(this.fb.group({
      name:null,
      surname:null,
      fin:null,
      birthdate:null,
      gender:null,
      identityPhotoId:null
    }))
  }

  public addRewards(){
    let rewards = this.form.controls.rewards as FormArray;
    rewards.push(this.fb.group({
      name:null,
      date:null
    }))
  }

  public addApartment(){
    let apartments = this.form.controls.apartments as FormArray;
    apartments.push(this.fb.group({
      peopleCount:null,
      totalArea:null,
      roomCount:null,
      hasDocument:null,
      photos: this.fb.array([ ]) 
    }))

  }
 
  public onSelectMilitaryId(event){
    if (event.target.files && event.target.files[0]) {
      this.martyrName = event.target.files[0].name
      let filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();

              reader.onload = (event:any) => {
                let img = event.target.result.split(',')[1];
               
              
                 this.form.controls.identityPhotoId.patchValue('b83ed894-c0e9-439b-965c-08d8bbb7af43');

              }

              reader.readAsDataURL(event.target.files[i]);
      }
  }

  }
  
  public clearId(){
    this.martyrName = 'photo';
    this.form.controls.identityPhotoId.patchValue('');
  }  

  public clearChildId(i){

  } 

  public onSelectId(event,index){
    if (event.target.files && event.target.files[0]) {
      this.childImage = (event.target.files[0].name);
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => { 
                let img = event.target.result.split(',')[1];
                 this.form.controls.children['controls'][index]['controls'].identityPhotoId.patchValue('b83ed894-c0e9-439b-965c-08d8bbb7af43');
              }

              reader.readAsDataURL(event.target.files[i]);
      }
  }
  }

  


  

  public onSelectHome(event,index){
    if (event.target.files && event.target.files[0]) {
      this.home = event.target.files[0].name
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                let img = event.target.result.split(',')[1];
                let apartments = this.form.get("apartments") as FormArray;
                let apartmentPhotos =  apartments.at(index).get('photos') as FormArray;
                let newApartmentPhoto = this.fb.group({
                  photoId: 'b83ed894-c0e9-439b-965c-08d8bbb7af43'
                })
                apartmentPhotos.push(newApartmentPhoto);

              }

              reader.readAsDataURL(event.target.files[i]);
      }
  }    
  }

  public submit(){
      this.http.post("https://demoform.sinaps.az/api/Form",this.form.value).subscribe(res=>{
        if(res){
         this.form.reset();
          this.router.navigate(['/success']);
        }
     
      })

  }

}
