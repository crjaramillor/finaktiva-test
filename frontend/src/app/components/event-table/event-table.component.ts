import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLog } from '../../models/eventlog';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent {
  @Input() eventLogs: EventLog[] = [];
}
