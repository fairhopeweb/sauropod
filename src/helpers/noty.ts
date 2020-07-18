
import Noty from 'noty';

const notify = (text : string) => {
  new Noty({
    theme: 'nest',
    layout: 'bottomCenter',
    timeout: 8000,
    animation: {
      open : 'animate__animated animate__fadeInUp',
      close: 'animate__animated animate__fadeOutDown'
    },
    text,
  }).show();
}

export default notify;