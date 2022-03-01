import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  links = [
    {
      name: "Backend API URL",
      icon: "webhook",
      url: "http://localhost:8081/swagger-ui/index.html"
    },
    {
      name: "Authorization Server URL",
      icon: "security",
      url: "http://localhost:8080/auth/"
    },
    {
      name: "Adminer database URL",
      icon: "storage",
      url: "http://localhost:7777/"
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
