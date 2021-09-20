import { Component, OnInit } from '@angular/core';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { faBed, faBone, faDog, faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  faUser =faUser;
  faDog = faDog;
  faBed = faBed;
  faBone = faBone;
  faUsersCog = faUsersCog;
  faDotCircle = faDotCircle;

  constructor() { }

  ngOnInit() {}




}
