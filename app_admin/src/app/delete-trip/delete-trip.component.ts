import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
  deleteForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      console.error('No tripCode found in localStorage.');
      // Handle the error or redirect as needed
      return;
    }
  
    this.getTrip(tripCode);
  }
  

  getTrip(tripCode: string) {
    this.tripService
      .getTrip(tripCode)
      .then((trip: Trip) => {
        this.deleteForm.patchValue(trip);
      })
      .catch(error => {
        console.error('Error retrieving trip:', error);
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.deleteForm.valid) {
      const tripCode = this.deleteForm.value.code;
      this.tripService
        .deleteTrip(tripCode)
        .then(() => {
          console.log('Trip deleted successfully.');
          this.router.navigate(['']);
        })
        .catch(error => {
          console.error('Error deleting trip:', error);
        });
    }
  }
}
