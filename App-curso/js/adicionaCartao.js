var controladorDeCartoes = (function() {
  function removeCartao(conteudo) {
    var cartao = document.querySelector('#cartao_' + this.dataset.ref);

    cartao.classList.add('cartao--some'); //dá uma classe que faz ele sumir devagar

    setTimeout(function () { //tira a animacao da página depois
      cartao.remove();
    }, 400);
  }
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
  }
  var contador = 0;
  function adicionaCartao (conteudo, cor){
    contador++; //soma um no contador
    var botaoRemover = $('<button>').addClass('opcoesDoCartao-remove').attr('data-ref', contador)
    .text('Remover').click(removeCartao);
    var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemover);
    var tipoCartao = decideTipoCartao(conteudo);
    var conteudoTag = $('<p>').addClass('cartao-conteudo').append(conteudo);
    $('<div>').attr('id','cartao_' + contador).addClass('cartao')
    .addClass(tipoCartao).append(opcoes).append(conteudoTag).css('background-color',cor).prependTo('.mural');
  }
  return { adicionaCartao: adicionaCartao, idUltimoCartao: function() {
    return contador;
  }
  }
}) ();
