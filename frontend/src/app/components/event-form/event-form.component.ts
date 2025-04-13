import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  description: string = '';
  type: string = 'manual'; // Siempre será "manual" según tu lógica

  @Output() submitEvent = new EventEmitter<{ description: string; type: string }>();
  @Output() showToast = new EventEmitter<{ message: string, messageType: 'success' | 'error' }>();

  onSubmit() {
    // Verificamos si la descripción tiene al menos 3 caracteres
    if (this.description.length < 3) {
      // Si la descripción es inválida, mostramos un mensaje de error
      this.showToast.emit({ message: 'La descripción debe tener al menos 3 caracteres.', messageType: 'error' });
    } else {
      // Si la descripción es válida, emitimos el evento
      this.submitEvent.emit({ description: this.description, type: this.type });
      this.description = ''; // Limpiar el campo de descripción
    }
  }
}
