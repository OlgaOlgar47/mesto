const AtlanticClouds = new URL('../images/Atlantic_clouds.jpeg', import.meta.url);
const CloudyStorm = new URL('../images/Cloudy_storm.jpeg', import.meta.url);
const CloudyDrops = new URL( '../images/Cloudy_drops.jpeg', import.meta.url);
const MediterranianClouds = new URL('../images/Mediterranian_clouds.jpeg', import.meta.url);
const UnPocoClouds = new URL('../images/Un_poco_clouds.jpeg', import.meta.url);
const CloudsRosados = new URL('../images/Clouds_rosados.jpeg', import.meta.url);

export const initialCards = [
  {
    name: 'Atlantic clouds',
    link: AtlanticClouds
  },
  {
    name: 'Cloudy storm',
    link: CloudyStorm
  },
  {
    name: 'Cloudy drops',
    link: CloudyDrops
  },
  {
    name: 'Mediterranian clouds',
    link: MediterranianClouds
  },
  {
    name: 'Un poco clouds',
    link: UnPocoClouds
  },
  {
    name: 'Clouds rosados',
    link: CloudsRosados
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
} 

export const templateSelector = '#card-template';
export const containerSelector = '.elements__list';