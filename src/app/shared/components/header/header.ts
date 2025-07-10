import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }

}
