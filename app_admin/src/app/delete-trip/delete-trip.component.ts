import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
  tripCode: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
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
      .then((trip) => {
        // Optionally, you can store the trip details in a variable for display
        console.log('Trip retrieved successfully:', trip);
      })
      .catch((error) => {
        console.error('Error retrieving trip:', error);
      });
  }

  onDelete() {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      console.error('No tripCode found in localStorage.');
      // Handle the error or redirect as needed
      return;
    }

    this.tripService
      .deleteTrip(tripCode)
      .then(() => {
        console.log('Trip deleted successfully.');
        this.router.navigate(['']); // Replace 'router' with your router instance
      })
      .catch((error) => {
        console.error('Error deleting trip:', error);
      });
  }

  onCancel() {
    this.router.navigate(['']); // Navigate back to the trips page
  }
}
