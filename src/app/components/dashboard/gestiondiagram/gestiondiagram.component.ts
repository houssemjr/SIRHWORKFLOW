import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { LeaverequestComponent } from '../../employerdash/leaverequest/leaverequest.component';

@Component({
  selector: 'app-gestiondiagram',
  templateUrl: './gestiondiagram.component.html',
  styleUrls: ['./gestiondiagram.component.css'],
  standalone: true,
  imports: [
    HttpClientModule, CommonModule, SharedModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, 
    MatInputModule, RouterModule, LeaverequestComponent, DynamicFormComponent, ReactiveFormsModule,MatCardModule
  ]
})
export class GestionDiagramComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef;
  private bpmnJS!: BpmnModeler;
  apiUrl = 'http://localhost:9999/wf/addwork';
  IdEmployee: string | null = null;
  diagramForm!: FormGroup;
  diagrams: any[] = [];
  selectedDiagram: any;

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
    this.diagramForm = this.fb.group({
      diagramName: ['', Validators.required],
      selectedDiagram: ['', Validators.required]
    });
    this.fetchDiagrams();
  }

  ngAfterViewInit(): void {
    this.initializeBpmnModeler();
  }

  ngOnDestroy(): void {
    if (this.bpmnJS) {
      this.bpmnJS.destroy();
    }
  }

  initializeBpmnModeler(): void {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      this.bpmnJS = new BpmnModeler({
        container: this.canvasRef.nativeElement,
        width: '100%',
        height: '100%',
        additionalModules: [],
        keyboard: {
          bindTo: window
        }
      });
    } else {
      console.error('Canvas element is not available.');
    }
  }

  importDiagram(diagram: string): void {
    this.bpmnJS.importXML(diagram)
      .then((result) => {
        const { warnings } = result;
        console.log('BPMN diagram loaded successfully!', warnings);
        const canvas = this.bpmnJS.get('canvas');
        if (canvas) {
          // canvas.zoom('fit-viewport');
        } else {
          console.error('Canvas is not available.');
        }
      })
      .catch((err) => {
        const { warnings, message } = err;
        console.log('Something went wrong:', warnings, message);
      });
  }

  saveDiagram(): void {
    if (this.diagramForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const diagramName = this.diagramForm.value.diagramName;
    this.bpmnJS.saveXML({ format: true }).then(
      (result: any) => {
        const { xml } = result;
        if (xml) {
          console.log('BPMN 2.0 diagram saved', xml);

          // Créez un blob pour le XML
          const blob = new Blob([xml], { type: 'text/xml' });
          const url = window.URL.createObjectURL(blob);

          // Créez un lien pour le téléchargement
          const a = document.createElement('a');
          a.href = url;
          a.download = `${diagramName}.bpmn`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          // OU, envoyer directement au backend
          this.uploadDiagram(xml, diagramName);
        } else {
          console.error('XML is undefined');
        }
      },
      (err: any) => {
        console.error('Error saving BPMN 2.0 diagram', err);
      }
    );
  }

  uploadDiagram(xml: string, diagramName: string): void {
    const diagramRequest = {
      name: diagramName,
      xml: xml
    };

    this.http.post('http://localhost:9999/api/diagrams/save', diagramRequest)
      .subscribe(response => {
        console.log('Diagramme déployé avec succès', response);
      }, error => {
        console.error('Erreur lors du déploiement du diagramme', error);
      });
  }

  createNewDiagram(): void {
    const newDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_07749pf" targetNamespace="http://bpmn.io/schema/bpmn" xmlns:modeler="http://camunda.org/schema/modeler/1.0" exporter="Camunda Modeler" exporterVersion="5.19.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.20.0">
  <bpmn:process id="Process_0e6k0an" isExecutable="true" camunda:historyTimeToLive="180">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0e6k0an">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="159" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

    this.importDiagram(newDiagram);
  }

  fetchDiagrams() {
    this.http.get<any[]>('http://localhost:9999/api/diagrams/fetchall').subscribe(
      data => {
        console.log('Diagrams fetched:', data);
        this.diagrams = data;
        if (this.diagrams.length > 0) {
          this.selectedDiagram = this.diagrams[0];
          this.diagramForm.patchValue({ selectedDiagram: this.selectedDiagram.id });
          this.importDiagram(this.selectedDiagram.xml);
        }
      },
      error => {
        console.error('Error fetching diagrams', error);
      }
    );
  }

  onDiagramChange(diagram: any): void {
    this.selectedDiagram = diagram;
    this.importDiagram(diagram.xml);
  }
  
}
