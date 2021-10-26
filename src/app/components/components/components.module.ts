import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../lateral/lateral.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../footer/footer.component';



@NgModule({
  declarations: [LateralComponent,FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ],exports:[LateralComponent,FooterComponent]
})
export class ComponentsModule { }
