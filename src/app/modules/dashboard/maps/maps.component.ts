import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  options: any;
  overlays: any[] = [];
  dialogVisible: boolean = false;
  markerTitle?: string | null;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean = false;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.options = {
      center: {lat: 36.894155, lng: 10.186928},
      zoom: 4
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({severity: 'info', summary: 'Marker Selected', detail: title});
    } else {
      this.messageService.add({severity: 'info', summary: 'Shape Selected', detail: ''});
    }
  }

  addMarker() {
    this.overlays.push(new google.maps.Marker({
      position: {
        lat: this.selectedPosition.lat(),
        lng: this.selectedPosition.lng()
      }, title: this.markerTitle, draggable: this.draggable
    }));
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  handleDragEnd(event: any) {
    this.messageService.add({severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle()});
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        //36.887162493427866    36.887162493427866
        new google.maps.Marker({position: {lat: 36.894155, lng: 10.186928}, title: "lbConsulting"}),
        new google.maps.Marker({position: {lat: 48.877520, lng: 2.346795}, title: " Park france"}),
        new google.maps.Polygon({
          paths: [
            {lat: 36.894155, lng: 10.186928}, {
              lat: 36.9177,
              lng: 30.8159
            }
          ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
        }),
        new google.maps.Circle({
          center: {lat: 36.894155, lng: 10.186928},
          fillColor: '#1976D2',
          fillOpacity: 0.35,
          strokeWeight: 1,
          radius: 1500
        }),
        new google.maps.Polyline({
          path: [{lat: 36.894155, lng: 10.186928}],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 2
        })
      ];
    }
  }

  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
  }

}
