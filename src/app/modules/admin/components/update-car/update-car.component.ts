import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent {

  isSpinning = false;
  carId: number = this.activatedRoute.snapshot.params["id"];
  imgChanged = false;
  selectedFile : any;
  imagePreview : string | ArrayBuffer | null | undefined;
  existingImage : string | null = null;
  updateForm!:FormGroup;
  listOfOption: Array<{ label: string ; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];
  listOfColor = ["Red", "Blue", "Black", "White", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  
  constructor(private activatedRoute : ActivatedRoute, private adminService : AdminService,
              private fb:FormBuilder , private message : NzMessageService, private router:Router) { };

  ngOnInit()
  {
    this.updateForm = this.fb.group({
       name:[null, Validators.required],
            brand:[null, Validators.required],
            type:[null, Validators.required],
            color:[null, Validators.required],
            transmission:[null, Validators.required],
            price:[null, Validators.required],
            description:[null, Validators.required],
            year:[null, Validators.required],
    })
    this.getCarbyId();
  }

  getCarbyId()
  {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res)=>{
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(res);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar(){
    if (!this.updateForm || !this.updateForm.valid) {
      console.error("Form is invalid or not initialized.");
      return;
    }
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.warn("No image selected.");
    }
    formData.append('brand' , this.updateForm.get('brand')?.value);
    formData.append('name' , this.updateForm.get('name')?.value);
    formData.append('type' , this.updateForm.get('type')?.value);
    formData.append('color' , this.updateForm.get('color')?.value);
    formData.append('year' , this.updateForm.get('year')?.value.toString());
    formData.append('transmission' , this.updateForm.get('transmission')?.value);
    formData.append('description' , this.updateForm.get('description')?.value);
    formData.append('price' , this.updateForm.get('price')?.value);
    console.log(formData);
    this.adminService.updateCar(this.carId , formData).subscribe((res)=>{
      this.isSpinning = false; 
      this.message.success("Car updated successfully" , { nzDuration: 5000 })
      this.router.navigateByUrl("/admin/dashboard")
    }, error=>{
      this.message.error("Error while updating car", { nzDuration : 5000 });
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event?.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage()
  {
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
  }

}
