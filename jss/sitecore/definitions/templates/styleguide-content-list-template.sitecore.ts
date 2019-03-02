// eslint-disable-next-line no-unused-vars
import {CommonFieldTypes, Manifest} from '@sitecore-jss/sitecore-jss-manifest';

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 */
export default function (manifest: Manifest) {
    manifest.addTemplate({
        name: 'Styleguide-ContentList-Item-Template',
        fields: [{name: 'title', type: CommonFieldTypes.SingleLineText},
            {name: 'lat', type: CommonFieldTypes.Number},
            {name: 'lng', type: CommonFieldTypes.Number},
            {name: 'content', type: CommonFieldTypes.RichText}
        ],
    });
}
