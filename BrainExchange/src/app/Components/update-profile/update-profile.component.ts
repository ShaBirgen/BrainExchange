import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [RouterLink, FooterComponent, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  imageUpload: any[] = [];
  imgUrl: string | null = null;
  updateProductForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.updateProductForm = this.formBuilder.group({
      // Define form controls here if needed
      image: [''], // Example control
    });
  }
  

  async uploadImage(event: any) {
    const target = event.target;
    const files = target.files;
    if (files) {
      console.log(files);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'Shopit_images');
      formData.append('cloud_name', 'dzz8vdx5s');

      console.log(formData);

      await fetch('https://api.cloudinary.com/v1_1/dzz8vdx5s/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res: any) => {
          return res.json();
        })
        .then((data) => {
          console.log('this is the URL', data.url);
          this.updateProductForm.get('image')?.setValue(data.url);
          return (data.url = this.imgUrl);
        });
      // })
    }
  }
}
