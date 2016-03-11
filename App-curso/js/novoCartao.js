$('.novoCartao').submit(function(event){
  var campoConteudo = $('.novoCartao-conteudo');
  var conteudo = campoConteudo.val().trim();

  if (conteudo) {
  controladorDeCartoes.adicionaCartao(conteudo, '#EBEF40');
  }
  campoConteudo.val('');
  event.preventDefault();
});

function decideTipoCartao(conteudo) {
  var quebras = conteudo.split('<br>').length;
  var totalDeLetras = conteudo.replace(/<br>/g,'').length;

  var ultimoMaior = '';
  conteudo.replace(/<br>/g, '').split('').forEach(function(palavra) {
    if (palavra.length > ultimoMaior.length) {
      ultimoMaior = palavra;
    }
  });
  var tamMaior = ultimoMaior.length;
  //no minimo o texto tem que ter o texto pequeno
  var tipoCartao = 'cartao--textoPequeno';

  if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
    tipoCartao = 'cartao--textoGrande';
  } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
    tipoCartao = 'cartao--textoMedio';
  }
  return tipoCartao;
};
