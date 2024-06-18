import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule, TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-organigramme',
  standalone: true,
  imports: [SharedModule,CommonModule,OrganizationChartModule],
  templateUrl: './organigramme.component.html',
  styleUrl: './organigramme.component.css'
})
export class OrganigrammeComponent {

  data: TreeNode[] = [
    {
        expanded: true,
        type: 'person',
        styleClass: 'bg-indigo-500 text-white',
        data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO'
        },
        children: [
            {
                expanded: true,
                type: 'person',
                styleClass: 'bg-purple-500 text-white',
                data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                    name: 'Anna Fali',
                    title: 'CMO'
                },
                children: [
                    {
                        label: 'Sales',
                        styleClass: 'bg-purple-500 text-white',
                        style: ' border-radius: 12px'
                    },
                    {
                        label: 'Marketing',
                        styleClass: 'bg-purple-500 text-white',
                        style: ' border-radius: 12px'
                    }
                ]
            },
            {
                expanded: true,
                type: 'person',
                styleClass: 'bg-teal-500 text-white',
                data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                    name: 'Stephen Shaw',
                    title: 'CTO'
                },
                children: [
                    {
                        label: 'Development',
                        styleClass: 'bg-teal-500 text-white'
                    },
                    {
                        label: 'UI/UX Design',
                        styleClass: 'bg-teal-500 text-white'
                    }
                ]
            }
        ]
    }
];
}