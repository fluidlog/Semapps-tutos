import PersonList from './PersonList';
import PersonIcon from '@material-ui/icons/Person';

export default {
  config: {
    list: PersonList,
    icon: PersonIcon,
    options: {
      label: 'Tuto2',
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
      name: 'Personne |||| Personnes',
      fields: {
        'pair:firstName': 'Prénom',
        'pair:lastName': 'Nom de famille',
        'pair:comment': 'En deux mots',
        'og:leads': 'Référent',
        image: 'Photo',
        'pair:involvedIn': 'Contributeur',
        'pair:affiliatedBy': 'Membre de',
        'pair:offers': 'A pour compétences',
        'pair:hasTopic': 'A pour intérêt',
        'pair:hasLocation': 'Adresse'
      }
    }
  }
};
