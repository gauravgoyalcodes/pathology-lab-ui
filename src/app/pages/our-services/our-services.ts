import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-services',
  imports: [CommonModule],
  templateUrl: './our-services.html',
  styleUrl: './our-services.css',})
export class OurServices {

  index = 0;

 profiles = [
 {
   name: 'Sampoorna Health Check',
   tag: 'Sampoorna Health',
   desc: 'Complete preventive diagnostics for overall wellness.',
   tests: ['CBC','LFT','KFT','Vit D & B12','Lipid','Thyroid','Iron','Blood Sugar', 'HBA1C', 'Urine Exam'],
   bg: 'health',
   image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png'
 },
 {
   name: 'Jeevan Cancer Care Panel',
   tag: 'Cancer Care Panel',
   desc: 'Early cancer screening with advanced pathology tests.',
   tests: ['CBC','Peripheral Blood Smear','Total PSA (Male) / Beta HCG (Female)', 'CA 125 (Female)', 'CA 19.9', 'CEA', 'Alpha Feto Protien (AFP)', 'LDH'],
   bg: 'cancer',
   image: 'https://cdn-icons-png.flaticon.com/512/2966/2966323.png'
 },
 {
   name: 'Sehat Fever Check',
   tag: 'Fever Check',
   desc: 'Comprehensive fever monitoring package.',
   tests: ['CBC', 'ESR', 'Malaria', 'Typhoid', 'Urine Examination'],
   bg: 'fever',
   image: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png'
 }
 ];

 constructor(private router: Router) {}

 move(step:number){
   this.index += step;
   if(this.index < 0) this.index = this.profiles.length-1;
   if(this.index >= this.profiles.length) this.index = 0;
 }

 book(profile:string){
   this.router.navigate(['/book-appointment'],{
     queryParams:{ profile }
   });
 }
}
