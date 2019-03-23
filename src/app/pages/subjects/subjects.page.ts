import { Component, OnInit } from '@angular/core';
import { SubjectI } from "../../models/subject.interface";
import { SubjectService } from "../../services/subject.service";


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  subjects: SubjectI[];

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(res => { this.subjects = res });
  }
}
