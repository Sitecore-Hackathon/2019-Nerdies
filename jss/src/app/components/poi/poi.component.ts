import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentRendering} from '@sitecore-jss/sitecore-jss-angular';
import {initStoreLocator} from '../../../assets/js/jquery.storelocator';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import {environment} from '../../../environments/environment';
import {trackingApi} from '@sitecore-jss/sitecore-jss-tracking';
import {JssDataFetcherService} from '../../jss-data-fetcher.service';
import {TrackingRequestOptions} from '@sitecore-jss/sitecore-jss-tracking/types/trackingRequestOptions';
import {JssContextService} from '../../jss-context.service';

declare var jQuery: any;

@Component({
    selector: 'app-poi',
    styleUrls: ['./poi.component.scss'],
    templateUrl: './poi.component.html',
    encapsulation: ViewEncapsulation.None

})
export class PoiComponent implements OnInit, OnDestroy {
    @Input() rendering: ComponentRendering;
    private storeLocatorInstance;
    public addLocationsError;
    trackingApiOptions: TrackingRequestOptions;
    disconnectedMode = true;

    constructor(dataFetcher: JssDataFetcherService, private jssContext: JssContextService) {
        this.trackingApiOptions = {
            host: environment.sitecoreApiHost,
            querystringParams: {
                sc_apikey: environment.sitecoreApiKey,
            },
            fetcher: dataFetcher.fetch,
        };
    }

    ngOnInit() {
      this.jssContext.state.subscribe((state) => {
            console.log('The current Sitecore Context in styleguide-sitecore-context.component.ts is...', state);
        });
        this.disconnectedMode = this.rendering.dataSource === 'available-in-connected-mode';

        const API_KEY: any = this.rendering.fields.api;
        const MARKER_IMAGE: any = this.rendering.fields.markerImage;
        const MARKER_IMAGE_SELECTED: any = this.rendering.fields.markerImageSelected;
        const locations = [];
        console.log(this.rendering);
        if (this.rendering.fields.poiList !== undefined) {
            for (const value of this.rendering.fields.poiList) {

                const LAT: any = value.fields.lat;
                const LNG: any = value.fields.lng;
                const TITLE: any = value.fields.title;
                const CONTENT: any = value.fields.content;
                locations.push({
                    name: TITLE.value,
                    lat: LAT.value,
                    lng: LNG.value,
                    content: CONTENT.value

                });
            }
        } else {
            this.addLocationsError = true;
        }
        //  console.log(locations)

        GoogleMapsApiLoader({
            apiKey: API_KEY.value // optional
        }).then((googleApi) => {
            initStoreLocator(jQuery, window, document);
            // let storeLocatorInstance = this.storeLocatorInstance;
            // console.log(locations);

            // plugin load code here
            this.storeLocatorInstance = jQuery('#bh-sl-map-container').storeLocator({
                dataRaw: locations,
                markerImg: MARKER_IMAGE.value.src,
                selectedMarkerImg: MARKER_IMAGE_SELECTED.value.src,
                markerDim: {height: 51, width: 34},
                selectedMarkerImgDim: {height: 51, width: 34},
                listColor2: '#fff',
                infowindowTemplatePath: (environment.production) ? '/dist/my-angular-jss-app/browser/assets/js/templates/standard/infowindow-description.html' : '/assets/js/templates/standard/infowindow-description.html',
                listTemplatePath: (environment.production) ? '/dist/my-angular-jss-app/browser/assets/js/templates/standard/location-list-description.html' : '/assets/js/templates/standard/location-list-description.html',
                mapSettings: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 12,
                    styles: [
                        {
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#f5f5f5'
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.icon',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#616161'
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.text.stroke',
                            'stylers': [
                                {
                                    'color': '#f5f5f5'
                                }
                            ]
                        },
                        {
                            'featureType': 'administrative.land_parcel',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#bdbdbd'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#eeeeee'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#757575'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi.park',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#e5e5e5'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi.park',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#9e9e9e'
                                }
                            ]
                        },
                        {
                            'featureType': 'road',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#ffffff'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.arterial',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#757575'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#dadada'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#616161'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.local',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#9e9e9e'
                                }
                            ]
                        },
                        {
                            'featureType': 'transit.line',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#e5e5e5'
                                }
                            ]
                        },
                        {
                            'featureType': 'transit.station',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#eeeeee'
                                }
                            ]
                        },
                        {
                            'featureType': 'water',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#c9c9c9'
                                }
                            ]
                        },
                        {
                            'featureType': 'water',
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'color': '#9e9e9e'
                                }
                            ]
                        }
                    ]
                },
                callbackMarkerClick: () => {
                    this.trackBranchEvent('');

                },
                callbackListClick: () => {
                    this.trackBranchEvent('');

                }


                //   debug: true

            });

        });


    }


    ngOnDestroy() {
        if (this.storeLocatorInstance) {
            this.destroy();
        }
    }

    trackBranchEvent(eventTitle) {
        if (!this.disconnectedMode) {
            console.log(this.disconnectedMode)
            trackingApi
                .trackEvent([{eventId: `{F0CC9698-6D7E-43C3-8D21-E3A1551DF189}`}], this.trackingApiOptions);

        }
    }

    destroy() {
        this.storeLocatorInstance.storeLocator('destroy');
    }
}

