import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public forecasts?: WeatherForecast[];

  constructor(
    private http: HttpClient,
  ) {
    // http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
    //   this.forecasts = result;
    // }, error => console.error(error));
  }

  title = 'MEal';

  ngOnInit(): void {
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
