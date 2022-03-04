import GraphList from './GraphList';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export default {
  config: {
    list: GraphList,
    icon: RadioButtonUncheckedIcon,
    options: {
      label: 'tuto2',
      panelSize: 5
    }
  },
  dataModel: {
    types: ['pair:Person'],
    containerUri: process.env.REACT_APP_MIDDLEWARE_URL + 'users',
    slugField: 'pair:label'
  },
  translations: {
    fr: {
      name: 'Cercle |||| Cercles',
      fields: {
        'pair:label': 'Nom',
        'og:purpose': 'Raison d\'être',
        'og:accountabilities': 'Redevabilités',
        'og:domain': 'Domaine',
        'og:leadBy': 'Référents',
        'pair:involves': 'Contributeurs',
        'pair:partOf': 'Fait partie de',
        'pair:hasPart': 'Sous-cercles',
        'pair:documentedBy': 'Documents',
        'pair:concernedBy': 'Agenda',
        'pair:homePage': 'Canaux de communication'
      }
    }
  }
};
