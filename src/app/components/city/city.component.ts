import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../../Model/city/city.service';

export interface City {
  id: string | undefined;
  city: string;
}

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  newCity: City = { id: undefined, city: '' };
  selectedCity: City | undefined;
  showConfirmation: boolean = false;
  cityToDeleteId: string | undefined;

  constructor(private http: HttpClient, private cityService: CityService) {}

  ngOnInit(): void {
    this.getCities();
  }

  // Fetch all cities
  getCities(): void {
    this.cityService
      .getCities()
      .then((cities) => {
        this.cities = cities;
      })
      .catch((error) => {
        console.error('Error fetching cities', error);
      });
  }

  // Add new city
  addCity(): void {
    this.cityService.addCity(this.newCity).subscribe({
      next: (response) => {
        console.log('City added successfully', response);
        this.cities.push(response);
        this.newCity = { id: undefined, city: '' };
      },
      error: (error) => {
        console.error('Error adding city', error);
      },
    });
  }

  // Update city
  updateCity(): void {
    if (this.selectedCity && this.selectedCity.id) {
      const patchOperation = [
        { op: 'replace', path: '/city', value: this.selectedCity.city },
      ];

      this.cityService.updateCity(this.selectedCity).subscribe({
        next: () => {
          console.log('City updated successfully');
          this.getCities(); // Refresh list
          this.selectedCity = undefined;
        },
        error: (error) => {
          console.error('Error updating city', error);
        },
      });
    }
  }

  // Show confirmation dialog before deleting city
  confirmDeleteCity(id: string | undefined): void {
    this.cityToDeleteId = id;
    this.showConfirmation = true;
  }

  // Delete city
  deleteCity(): void {
    if (this.cityToDeleteId) {
      console.log(`Attempting to delete city with ID: ${this.cityToDeleteId}`); // Add this for debugging
      this.cityService.deleteCity(this.cityToDeleteId).subscribe({
        next: () => {
          console.log('City deleted successfully');
          this.cities = this.cities.filter(
            (city) => city.id !== this.cityToDeleteId
          );
          this.showConfirmation = false;
        },
        error: (error) => {
          console.error('Error deleting city', error);
        },
      });
    }
  }

  // Cancel deletion
  cancelDelete(): void {
    this.showConfirmation = false;
  }

  // Select city for editing
  selectCity(city: City): void {
    this.selectedCity = { ...city };
  }
}
