---
name: creating-angular-components
description: Crea componentes de Angular altamente parametrizables y reutilizables. Úsalo cuando el usuario pida crear un nuevo componente de Angular, especialmente si menciona reutilización, personalización o parámetros.
---

# Creación de Componentes Angular Parametrizables

## Cuándo usar este skill
- Cuando el usuario pida crear un nuevo componente de Angular.
- Cuando el objetivo sea crear un elemento de UI reutilizable.
- Cuando el usuario enfatice la personalización (colores, tamaños, textos, iconos).

## Flujo de trabajo
- [ ] **Analizar Requisitos**: Identificar el propósito del componente y sus posibles variaciones.
- [ ] **Definir Inputs**: Determinar qué propiedades deben ser personalizables (ej. `color`, `size`, `label`, `icon`, `disabled`, `loading`).
- [ ] **Crear Componente**: Generar los archivos del componente (TS, HTML, CSS/SCSS).
- [ ] **Implementar Lógica**:
    - Usar `@Input()` para todas las propiedades personalizables.
    - Proporcionar valores por defecto lógicos.
    - Usar `ngClass` o `style bindings` para aplicar estilos basados en inputs.
- [ ] **Validación**: Asegurar que el componente funcione con diferentes combinaciones de inputs.

## Guía de Implementación

### 1. Clase del Componente (.ts)
- Usa tipado fuerte para los `@Input()`.
- Define valores por defecto.
- Ejemplo:
```typescript
@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label: string = '';
  @Input() icon: string | null = null;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
}
```

### 2. Plantilla (.html)
- Evita texto hardcodeado; usa los inputs.
- Usa `ng-content` para proyección de contenido flexible si aplica.
- Vincula clases dinámicamente.
```html
<button 
  [class]="['btn', 'btn-' + variant, 'btn-' + size]" 
  [class.w-full]="fullWidth"
  [disabled]="disabled">
  
  <i *ngIf="icon" [class]="icon"></i>
  
  <!-- Opción A: Texto vía Input -->
  <span *ngIf="label">{{ label }}</span>
  
  <!-- Opción B: Proyección de contenido (Slot) -->
  <ng-content></ng-content>
</button>
```

### 3. Estilos (.css/.scss)
- Define estilos base.
- Define clases modificadoras correspondientes a los valores de los inputs.
- Usa variables CSS para facilitar el theming.

```css
/* Base styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

/* Variants */
.btn-primary {
  background-color: var(--primary-color, #007bff);
  color: white;
}
.btn-secondary {
  background-color: var(--secondary-color, #6c757d);
  color: white;
}
.btn-outline {
  background-color: transparent;
  border-color: currentColor;
  color: var(--primary-color, #007bff);
}

/* Sizes */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.btn-md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}

/* State: Disabled */
.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Utility */
.w-full {
  width: 100%;
}
```

## Checklist de Verificación
- [ ] ¿El componente tiene `@Input()` para todas las variables visuales y de contenido importantes?
- [ ] ¿Hay valores por defecto seguros?
- [ ] ¿El componente utiliza `ng-content` si necesita anidar otros componentes?
- [ ] ¿Los estilos son modulares y no interfieren con el resto de la app (ViewEncapsulation)?
