import ThemeList from './ThemeList';
import DescriptionIcon from '@material-ui/icons/Description';

export default {
  config: {
    list: ThemeList,
    icon: DescriptionIcon,
    options: {
      label: 'Tuto1',
      panelSize: 6
    }
  },
  dataModel: {
    types: ['pair:Theme'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_META_URL + 'themes',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Theme |||| Themes',
      fields: {
        'pair:label': 'Titre',
        'pair:description': 'Description',
        'pair:comment': 'Courte description',
        'pair:hasType': 'Type',
        'pair:documents': 'Cercle',
        'dc:created': 'Créé le',
        'dc:creator': 'Créé par'
      }
    }
  }
};
