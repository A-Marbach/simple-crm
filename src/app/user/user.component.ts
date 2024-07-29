import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: User[] = []; 
  users$: Observable<User[]>;
  firestore: Firestore = inject(Firestore);

  constructor( public dialog: MatDialog) {
     // Referenziere die Collection 'users' und hole die Daten
     const usersCollection = collection(this.firestore, 'users');
     this.users$ = collectionData(usersCollection) as Observable<User[]>;
  }

  ngOnInit(): void {
    // Die 'idField' Option wird verwendet, um die Dokument-ID in das User-Objekt einzuschließen
    this.users$ = collectionData(
      collection(this.firestore, 'users'), 
      { idField: 'id' }
    ) as Observable<User[]>;

    // Subscriben zum Observable, um auf Änderungen zu reagieren
    this.users$.subscribe((changes: User[]) => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

