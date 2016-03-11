document.querySelector('#mudaLayout').addEventListener('click', function () {

  var mural = document.querySelector('.mural'); //pegar o elemento com a class=¨mural¨
  mural.classList.toggle('mural--linhas'); //tirar ou colocar class

  if (mural.classList.contains('mural--linhas')) {
    this.textContent = 'Bloco';
  } else {
    this.textContent = 'Linhas';
  }
});
