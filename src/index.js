// import _ from 'lodash';
import back from './assets/back.jpg';

function component(){
  const element = document.createElement('div');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  element.classList.add('hello');

  return element;
}

document.getElementsByTagName('body')[0].style.height = '100vh';
document.getElementsByTagName('body')[0].style.backgroundImage = `url(${back})`;
document.getElementsByTagName('body')[0].style.backgroundSize = '100% 100%';

document.body.appendChild(component());
