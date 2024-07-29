import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepicker,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  loading = false;
  user = new User();
  birthDate: Date | null = null;
  firestore: Firestore = inject(Firestore);

  @ViewChild('datepicker') datepicker!: MatDatepicker<any>;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      console.log('current User is', this.user);
      this.loading = true;
      
      try {
        // Hinzufügen eines neuen Dokuments in der 'users'-Sammlung
        const docRef = await addDoc(collection(this.firestore, 'users'), { ...this.user });
        console.log('User added with ID: ', docRef.id);
        this.loading = false;
        this.dialogRef.close();
      } catch (e) {
        console.error('Error adding user: ', e);
        this.loading = false;
      }
    } else {
      console.log('Birth date is not set');
    }
  }
}


