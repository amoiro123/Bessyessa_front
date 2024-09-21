import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../product/services/brand.service';
import { Brand } from '../models/Brand';

/*@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {*/
@Component({
    selector: 'app-campaigns',
     templateUrl: './campaigns.component.html',
   })
  export class CampaignsComponent {

  brands: Brand[] = [];
  selectedBrand?: Brand;
  //newBrand: Brand = { id: '', name: '', description: '', addedBy: '', productType: '' };

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (data: Brand[]) => this.brands = data,
      (error) => console.error(error)
    );
  }

  getBrandById(id: string): void {
    this.brandService.getBrandById(id).subscribe(
      (data: Brand) => this.selectedBrand = data,
      (error) => console.error(error)
    );
  }

  /*createBrand(): void {
    this.brandService.createBrand(this.newBrand).subscribe(
      (data: Brand) => {
        this.brands.push(data);
        this.newBrand = { id: '', name: '', description: '', addedBy: '', productType: '' };
      },
      (error) => console.error(error)
    );
  }*/

  updateBrand(id: string): void {
    if (this.selectedBrand) {
      this.brandService.updateBrand(id, this.selectedBrand).subscribe(
        (data: Brand) => console.log('Brand updated', data),
        (error) => console.error(error)
      );
    }
  }

  deleteBrand(id: string): void {
    this.brandService.deleteBrand(id).subscribe(
      () => this.brands = this.brands.filter(b => b.id !== id),
      (error) => console.error(error)
    );
  }
}
