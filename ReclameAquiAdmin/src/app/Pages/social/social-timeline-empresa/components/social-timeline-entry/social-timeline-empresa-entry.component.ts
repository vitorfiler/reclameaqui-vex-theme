import { Component, Input, OnInit } from '@angular/core';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icComment from '@iconify/icons-ic/twotone-comment';

@Component({
  selector: 'vex-profile-timeline-entry',
  templateUrl: './social-timeline-empresa-entry.component.html',
  styleUrls: ['./social-timeline-empresa-entry.component.scss']
})
export class SocialTimelineEmpresaEntryComponent implements OnInit {

  @Input() avatarUrl: string;
  @Input() name: string;
  @Input() time: string;
  @Input() imageUrl: string;
  @Input() likes: number;
  @Input() comments: number;

  icFavorite = icFavorite;
  icComment = icComment;

  constructor() { }

  ngOnInit(): void {
  }

}
