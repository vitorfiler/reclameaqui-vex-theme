import { Component, Input, OnInit } from '@angular/core';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icComment from '@iconify/icons-ic/twotone-comment';

@Component({
  selector: 'vex-home-visual-entry',
  templateUrl: './home-entry.component.html',
  styleUrls: ['./home-entry.component.scss']
})
export class HomeVisualEntryComponent implements OnInit {

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
