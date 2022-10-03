import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../service/statistic.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  data: any;
  nbUser: any;
  options: any;
  basicData: any;
  nbCars: any;
  chartOptions: any;
  nbAudi: any;
  nbMercedes: any;
  nbReservation:any;
  constructor(private statisticService: StatisticService) {
    this.getNbUserActive()
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  ngOnInit(): void {
    this.getNbCars();
    this.getNbUserActive()
    this.getNbMercedes()
    this.getNbAudi()
    this.getStat()
    this.getNbReservations()
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'],
      datasets: [
        {
          label: 'Number of Reservation',
          backgroundColor: '#4be34f',
          data: [12, 19, 9, 13, 12, 55, 50, 35, 44, 13, 10, 9, 19]
        }
      ]
    };


  }

  getStat() {
    this.getNbAudi()
    this.getNbMercedes()
    console.log("***", this.nbAudi)
    this.data = {
      labels: ['Audi', 'Citroen', 'Toyota', 'Hyundai', 'Honda', 'Fiat', 'BMW', 'Lexus', 'Mercedes', 'Mitsubishi', 'opel', 'Nissan'],
      datasets: [
        {
          data: [this.nbAudi, this.nbMercedes, 9, 7, 10, 3, 9],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#66d968",
            "#ff130e",
            "rgba(195,104,215,0.84)",
            "rgba(248,93,93,0.55)"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#66d968",
            "#ff130e",
            "rgba(195,104,215,0.84)",
            "rgba(248,93,93,0.55)"
          ]
        }
      ]
    };
    // console.log(this.data)
    console.log("nb mercedes", this.nbMercedes)
  }

  getNbUserActive() {
    this.statisticService.getNbUserActive().subscribe(data => {
      console.log(data)
      this.nbUser = data;
    }, error => {
      console.log(error.error.message)
    })
  }

  getNbReservations() {
    this.statisticService.getNbReservations().subscribe(
      data => {
        this.nbReservation = data;
      }, error => {
        console.log(error.error.message)
      })
  }

  getNbCars() {
    this.statisticService.getNbCars().subscribe(data => {
        this.nbCars = data;
      }, error => {
        console.log("cars error ", error)
      }
    )
  }

  getNbAudi() {
    this.statisticService.getNbAudi().subscribe(data => {
      this.nbAudi = data;
      console.log("...00..", this.nbAudi)
    }, error => {
      console.log("get nb audi error :", error)
    })
  }

  getNbMercedes() {
    this.statisticService.getNbMercedes().subscribe(data => {
      this.nbMercedes = data;
      console.log("aaa", this.nbMercedes)
    })
  }
}
