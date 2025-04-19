import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Optional: define data here if you want to loop over it in HTML

  contactLinks = [
    { icon: '📧', label: 'Email: jatin.km@gmail.com' },
    { icon: '💼', label: 'LinkedIn: Jatin Kumar' },
    { icon: '💻', label: 'GitHub: captaindeadpool53' },
    { icon: '📞', label: 'Discord: captaindeadpool53' },
    { icon: '📸', label: 'Instagram: captaindeadpool53' }
  ];
}
