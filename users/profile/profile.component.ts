import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  profileForm!: FormGroup;
  currentUser: User | null = null;
  isEditing = false;
  isLoading = false;
  showPasswordFields = false;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      nombre: [this.currentUser?.nombre || '', [Validators.required, Validators.minLength(2)]],
      apellido: [this.currentUser?.apellido || '', [Validators.required, Validators.minLength(2)]],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      telefono: [this.currentUser?.['telefono'] || ''],
      password: [''],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value && confirmPassword?.value && password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.initForm();
      this.showPasswordFields = false;
    }
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.profileForm.patchValue({
        password: '',
        confirmPassword: ''
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.isLoading = true;
    const formValue = this.profileForm.value;

    // Preparar datos para actualizar
    const updateData: any = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      email: formValue.email,
      telefono: formValue.telefono
    };

    // Solo agregar password si se está cambiando
    if (formValue.password && formValue.password.trim() !== '') {
      updateData.password = formValue.password;
    }

    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.notificationService.success('Perfil actualizado exitosamente');
        this.currentUser = response.user;
        this.isEditing = false;
        this.showPasswordFields = false;
        this.isLoading = false;
        this.initForm();
      },
      error: (error) => {
        this.notificationService.error(error.error?.message || 'Error al actualizar perfil');
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.profileForm.get(controlName);
    return !!(control?.hasError(errorName) && (control?.dirty || control?.touched));
  }
}
