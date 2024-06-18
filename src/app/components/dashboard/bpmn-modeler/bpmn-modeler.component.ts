import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { LeaverequestComponent } from '../../employerdash/leaverequest/leaverequest.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bpmn-modeler',
  templateUrl: './bpmn-modeler.component.html',
  styleUrls: ['./bpmn-modeler.component.css'],
  standalone: true,
  imports: [
    HttpClientModule, CommonModule, SharedModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, 
    MatInputModule, RouterModule, LeaverequestComponent, DynamicFormComponent, ReactiveFormsModule
  ]
})
export class BpmnModelerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef;
  private bpmnJS!: BpmnModeler;
  apiUrl = 'http://localhost:9999/wf/addwork';
  IdEmployee: string | null = null;
  diagramForm!: FormGroup;

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
    this.diagramForm = this.fb.group({
      diagramName: ['', Validators.required]
    });
  }

    ngAfterViewInit(): void {
      this.initializeBpmnModeler();
      const diagram = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                          xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                          xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                          xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                          xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                          targetNamespace="http://bpmn.io/schema/bpmn">
          <bpmn:process id="Process_1" isExecutable="true">
            <bpmn:startEvent id="StartEvent_1"/>
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
              <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
                <dc:Bounds x="173" y="102" width="36" height="36"/>
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>`;

      this.importDiagram(diagram);
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
      <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                        xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                        xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                        xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                        targetNamespace="http://bpmn.io/schema/bpmn">
        <bpmn:process id="Process_1" isExecutable="false">
          <bpmn:startEvent id="StartEvent_1"/>
        </bpmn:process>
        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
          <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
            <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
              <dc:Bounds x="173" y="102" width="36" height="36"/>
            </bpmndi:BPMNShape>
          </bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
      </bpmn:definitions>`;

    this.importDiagram(newDiagram);
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const xml = e.target.result;
        this.importDiagram(xml);
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  }
}
