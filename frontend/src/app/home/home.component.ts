import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventlogService } from '../services/eventlog.service';
import { EventTableComponent } from '../components/event-table/event-table.component';
import { EventFormComponent } from '../components/event-form/event-form.component';
import { EventLog } from '../models/eventlog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventTableComponent, EventFormComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventLogs: EventLog[] = [];
  showForm = false; // Flag to show/hide the form

  // Filtros de búsqueda
  typeFilter: string = '';
  startDateFilter: string = '';
  endDateFilter: string = '';

  constructor(private service: EventlogService) {}

  ngOnInit(): void {
    this.loadEvents(); // Cargar los eventos al inicio
  }

  loadEvents() {
    // Crear un objeto con los parámetros de búsqueda
    const params: any = {};

    // Solo añadir los filtros que el usuario haya seleccionado
    if (this.typeFilter) {
      params.type = this.typeFilter;
    }
    if (this.startDateFilter && this.isValidDate(this.startDateFilter)) {
      params.startDate = this.startDateFilter;
    }
    if (this.endDateFilter && this.isValidDate(this.endDateFilter)) {
      params.endDate = this.endDateFilter;
    }

    // Llamada al servicio con los filtros aplicados (si hay)
    this.service.getFilteredEvents(params).subscribe(
      data => {
        this.eventLogs = data; 
      },
      error => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }

  // Función para validar si la fecha es válida
  isValidDate(date: string): boolean {
    return !isNaN(Date.parse(date));
  }
  // Validar que la descripción no esté vacía ni tenga menos de 3 caracteres
  validateDescription(description: string): boolean {
    if (!description || description.length < 3) {
      return false;  // La descripción es inválida
    }
    return true;  // La descripción es válida
  }
  
  onCreate(event: { description: string; type: string }) {
    if (!this.validateDescription(event.description)) {
      alert('La descripción debe tener al menos 3 caracteres.');
      return;  // Evitar enviar el evento si la descripción es inválida
    }

    this.service.addEventLog(event).subscribe(
      () => {
        this.loadEvents();  // Recargar los eventos después de agregar uno
        this.showForm = false;  // Cerrar el formulario después de registrar
      },
      error => {
        console.error('Error al registrar evento:', error);  // Capturar errores si los hay
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm; // Toggle form visibility
  }
  clearFilters() {
    this.typeFilter = '';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.loadEvents(); // Recargar la lista sin filtros
  }  
}
