import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  img: string;
  percent: string;
}

interface stats2 {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}


@Component({
  selector: 'app-upcoming-schedules',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule],
  templateUrl: './upcoming-schedules.component.html',
})
export class AppUpcomingSchedulesComponent {
  constructor() { }

  stats: stats[] = [
    {
      id: 1,
      color: 'primary',
      title: 'Paypal',
      subtitle: 'Big Brands',
      img: 'assets/images/svgs/icon-paypal.svg',
      percent: '6235',
    },
    {
      id: 2,
      color: 'success',
      title: 'Wallet',
      subtitle: 'Bill payment',
      img: 'assets/images/svgs/icon-office-bag.svg',
      percent: '345',
    },
    {
      id: 3,
      color: 'warning',
      title: 'Credit Card',
      subtitle: 'Money reversed',
      img: 'assets/images/svgs/icon-master-card.svg',
      percent: '2235',
    },
    {
      id: 4,
      color: 'error',
      title: 'Refund',
      subtitle: 'Bill Payment',
      img: 'assets/images/svgs/icon-pie.svg',
      percent: '32',
    },
  ];

  stats2: stats2[] = [
    {
      id: 1,
      time: 'Feb 2025',
      color: 'primary',
      title: 'Launch Basic version of Sales basha with seller portal',
    },
    {
      id: 2,
      time: 'April 2025',
      color: 'accent',
      subtext: 'Reach 1000 products listed and 10,000 buyers',
    },
    {
      id: 3,
      time: 'May 2025',
      color: 'success',
      title: 'Launch Advanced analytics',
    },
    {
      id: 4,
      time: 'June 2025',
      color: 'primary',
      title: 'Launch premium subscriptions & plans',
    },
    {
      id: 5,
      time: '2026',
      color: 'success',
      subtext: 'Continue supporting the micro / small seller eco-system',
    },
  ];
}
