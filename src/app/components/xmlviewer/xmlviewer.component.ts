import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BpmnService } from '../../services/bpmn.service';

@Component({
  selector: 'app-xmlviewer',
  templateUrl: './xmlviewer.component.html',
  styleUrls: ['./xmlviewer.component.css'],
  standalone: true,
  imports: []
})
export class XMLviewerComponent implements OnInit {
  public xml!: string;

  constructor(private router: Router, private appService: BpmnService) {}

  ngOnInit(): void {
    this.xml = this.appService.getXML();
    if (this.xml == undefined) {
      this.xml = 'To design a workflow, go to the diagram page.';
    }
  }

  viewDiagram(): void {
    this.router.navigate(['']);
  }
}
