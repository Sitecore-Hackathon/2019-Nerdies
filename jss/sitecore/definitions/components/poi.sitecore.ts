import {CommonFieldTypes, SitecoreIcon, Manifest} from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function (manifest: Manifest) {
    manifest.addComponent({
        name: 'Poi',
        icon: SitecoreIcon.ListStyle_numbered,
        fields: [
            {
                name: 'name', type: CommonFieldTypes.SingleLineText
            },
            {
                name: 'api', type: CommonFieldTypes.SingleLineText
            },
            {
                name: 'markerImage', type: CommonFieldTypes.Image
            },
            {
                name: 'markerImageSelected', type: CommonFieldTypes.Image
            },

            {name: 'poiList', type: CommonFieldTypes.ContentList},
        ],
    });
}
/*

 "id": "1",
    "name": "Chipotle Minneapolis",
    "lat": "44.947464",
    "lng": "-93.320826",
    "category": "Restaurant",
    "address": "3040 Excelsior Blvd",
    "address2": "",
    "city": "Minneapolis",
    "state": "MN",
    "postal": "55416",
    "phone": "612-922-6662",
    "web": "http:\/\/www.chipotle.com",
    "hours1": "Mon-Sun 11am-10pm",
    "hours2": "",
    "hours3": "",
    "featured": "",
    "features": "",
    "date": "10/17/18"

 */
