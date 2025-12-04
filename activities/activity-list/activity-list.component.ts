import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityService } from '../../../core/services/activity.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Activity {
  id: number;
  titulo: string;
  descripcion?: string;
  tipo?: string;
  fecha_inicio: string;
  fecha_fin?: string;
  ubicacion?: string;
  max_participantes?: number;
  estado?: string;
  organizador_id?: number;
}

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  private activityService = inject(ActivityService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  activities: Activity[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;

    this.activityService.getAllActivities({ page: 1, limit: 1000 }).subscribe({
      next: (response) => {
        this.activities = response.data || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.activities = [];
        this.isLoading = false;

        if (error.status === 403) {
          this.notificationService.warning('No tienes permisos para ver actividades');
        } else if (error.status !== 500) {
          this.notificationService.error('Error al cargar actividades');
        }
      }
    });
  }

  openCreateDialog(): void {
    if (!this.canCreateActivity()) {
      this.snackBar.open('No tiene permisos para crear actividades', 'Cerrar', { duration: 3000 });
      return;
    }
    
    this.snackBar.open('Función de crear actividad disponible próximamente', 'Cerrar', { duration: 3000 });
  }

  editActivity(activity: Activity): void {
    if (!this.canEditActivity()) {
      this.snackBar.open('No tiene permisos para editar actividades', 'Cerrar', { duration: 3000 });
      return;
    }
    
    this.snackBar.open('Función de editar actividad disponible próximamente', 'Cerrar', { duration: 3000 });
  }

  cancelActivity(id: number): void {
    if (!this.canEditActivity()) {
      this.notificationService.warning('No tiene permisos para cancelar actividades');
      return;
    }

    if (confirm('¿Está seguro de cancelar esta actividad?')) {
      this.activityService.updateActivity(id, { estado: 'Cancelada' }).subscribe({
        next: () => {
          this.notificationService.success('Actividad cancelada exitosamente');
          this.loadActivities();
        },
        error: (error) => {
          console.error('Error canceling activity:', error);
          this.notificationService.error(error.error?.message || 'Error al cancelar actividad');
        }
      });
    }
  }

  exportToCSV(): void {
    if (!this.canEditActivity()) {
      this.notificationService.warning('No tiene permisos para exportar');
      return;
    }

    this.notificationService.info('Exportación disponible próximamente');
  }

  canCreateActivity(): boolean {
    return this.authService.isAdmin() || this.authService.isSuperAdmin();
  }

  canEditActivity(): boolean {
    return this.authService.isAdmin() || this.authService.isSuperAdmin();
  }

  private getUserFromLocalStorage(): any {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
}