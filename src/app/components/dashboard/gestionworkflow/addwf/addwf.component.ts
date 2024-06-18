import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../../../dynamic-form/dynamic-form.component';
import { AuthService } from '../../../../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DsformComponent } from '../../dsform/dsform.component';
import { WorkflowService } from '../../../../services/workflow.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-addwf',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, DynamicFormComponent, MatToolbarModule, DsformComponent,MatListModule],
  templateUrl: './addwf.component.html',
  styleUrls: ['./addwf.component.css']
})
export class AddwfComponent implements OnInit {
  form!: FormGroup;

  apiUrl = 'http://localhost:9999/wf/createWithMotif';
  IdEmployee: string | null = null;
  formFields: any[] = [];
  diagrams: any[] = [];
  selectedWorkflowId: number | null = null;
  selectedDiagramId: number | null = null;
  workflows: any[] = [];



  constructor(private fb: FormBuilder,private authService: AuthService, private http: HttpClient, private cdr: ChangeDetectorRef,private workflowService:WorkflowService) {
    this.form = this.fb.group({
      workflowId: ['', Validators.required],
      diagramId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.IdEmployee);
    this.loadMotifs();
    this.loadWorkflows();
    this.loadDiagrams();

  }

  loadMotifs() {
    this.http.get<any[]>('http://localhost:9999/motif/getall').subscribe(
      (data) => {
        this.formFields = [
          {
            label: "Titre",
            type: "text",
            name: "titre",
            placeholder: "Entrez le titre du workflow",
            validation: {
              required: true,
              minLength: 3,
              maxLength: 50
            }
          },
          {
            label: "Code",
            type: "text",
            name: "code",
            placeholder: "Entrez le code du workflow",
            validation: {
              required: true,
              minLength: 2,
              maxLength: 20
            }
          },
          {
            label: "Date de Validation",
            type: "date",
            name: "datevalidation",
            placeholder: "Sélectionnez la date de validation",
            validation: {
              required: true
            }
          },
          {
            label: "Status",
            type: "checkbox",
            name: "status",
            options: [
              { label: "Actif", value: true },
              { label: "Inactif", value: false }
            ],
            validation: {
              required: true
            }
          },
          {
            label: "Motif",
            type: "select",
            name: "motifId",
            placeholder: "Sélectionnez le motif associé",
            options: data.map(motif => ({ label: motif.titre, value: motif.id })),
            validation: {
              required: true
            }
          }
        ];
        this.cdr.detectChanges(); // Déclencher le changement de détection
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs : ', error);
      }
    );
  }
  loadWorkflows(): void {
    this.workflowService.getWorkflows().subscribe(data => {
      this.workflows = data;
    });
  }

  loadDiagrams(): void {
    this.workflowService.getAllDiagrams().subscribe(data => {
      this.diagrams = data;
    });
  }

  onAssign(): void {
    if (this.selectedWorkflowId && this.selectedDiagramId) {
      console.log('Assigning Diagram:', this.selectedDiagramId, 'to Workflow:', this.selectedWorkflowId);
      this.workflowService.assignDiagramToWorkflow(this.selectedWorkflowId, this.selectedDiagramId).subscribe(
        response => {
          console.log('Diagram assigned to workflow', response);
          // Optionally reload the workflows or show a success message
        },
        error => {
          console.error('Error assigning diagram to workflow:', error);
        }
      );
    } else {
      console.warn('Workflow or Diagram not selected');
    }
  }


}
