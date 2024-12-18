import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import {Form, FormsModule } from '@angular/forms';
import { ISubscription } from '../interfaces/subscription';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {

  subscriptionService = inject(SubscriptionService);

  emailAlreadyInUse : boolean = false;
  isSubscribed : boolean = false;

  onSubmit(formVal:ISubscription){
    this.isSubscribed = false;
    this.emailAlreadyInUse = false;
    const subData : ISubscription = {
      name:formVal.name,
      email: formVal.email
    }
    this.subscriptionService.emailExists(subData.email).subscribe((exists)=>{
      if(!exists){
        this.emailAlreadyInUse = false;
        this.subscriptionService.addSubscription(subData).subscribe(()=>{
          this.isSubscribed = true;
        })
      }
      else{
        this.emailAlreadyInUse = true;
      }
        
        
    })
    
  }
}
