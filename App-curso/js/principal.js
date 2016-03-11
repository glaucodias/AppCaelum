document.querySelector('#mudaLayout').addEventListener('click', function () {

  var mural = document.querySelector('.mural'); //pegar o elemento com a class=¨mural¨
  mural.classList.toggle('mural--linhas'); //tirar ou colocar class

  if (mural.classList.contains('mural--linhas')) {
    this.textContent = 'Bloco';
  } else {
    this.textContent = 'Linhas';
  }
});

function removeCartao() {
  var cartao = document.querySelector('#cartao_' + this.dataset.ref);

  cartao.classList.add('cartao--some'); //dá uma classe que faz ele sumir devagar

  setTimeout(function () { //tira a animacao da página depois
    cartao.remove();
  }, 400);
}

var botoes = document.querySelectorAll('.opcoesDoCartao-remove'); //pega os botoes

for(var i=0; i<botoes.length; i++){
  botoes[i].addEventListener('click', removeCartao); //adiciona o evento em cada botao
};

var contador = $('.cartao').length;
function adicionaCartao(conteudo, cor){
  contador++; //soma um no contador
  var botaoRemover = $('<button>').addClass('opcoesDoCartao-remove').attr('data-ref', contador)
  .text('Remover').click(removeCartao);
  var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemover);
  var tipoCartao = decideTipoCartao(conteudo);
  var conteudoTag = $('<p>').addClass('cartao-conteudo').append(conteudo);
  $('<div>').attr('id','cartao_' + contador).addClass('cartao')
  .addClass(tipoCartao).append(opcoes).append(conteudoTag).css('background-color',cor).prependTo('.mural');
}
$('.novoCartao').submit(function(event){
  var campoConteudo = $('.novoCartao-conteudo');
  var conteudo = campoConteudo.val().trim();

  if (conteudo) {
  adicionaCartao(conteudo, '#EBEF40');
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

$('#busca').on('input', function(){
    var busca =$(this).val().trim();
    if (busca.length) {
        $('.cartao').hide().filter(function(){
            return $(this).find('.cartao-conteudo').text().match(new RegExp(busca,'i'));
        }) .show();
    } else {
        $('.cartao').show();
    }
});

$('#ajuda').click(function(){
  $.getJSON('http://ceep.herokuapp.com/cartoes/instrucoes',
    function(res){
      res.instrucoes.forEach(function(instrucao) {
        adicionaCartao(instrucao.conteudo, instrucao.cor);
      });
    }
  );
});

(function () {
  var usuario = 'glauco.dias@gmail.com';
    $.getJSON (
      'http://ceep.herokuapp.com/cartoes/carregar?callback=?',
      {usuario: usuario},
      function(res) {
        var cartoes = res.cartoes;
        console.log(cartoes.length + ' carregados em ' + res.usuario);
        cartoes.forEach(function(cartao){
          adicionaCartao(cartao.conteudo);
        });
      }
    );
    $('#sync').click(function() {
      $('#sync').removeClass('botaoSync--sincronizado');
      $('#sync').addClass('botaoSync--esperando');
      var cartoes = [];
      $('.cartao').each(function() {
        var cartao= {};
        cartao.conteudo = $(this).find('.cartao-conteudo').html();
        cartoes.push (cartao);
      });
      var mural = {
        usuario: usuario,
        cartoes: cartoes
      }
      $.ajax({
        url: 'http://ceep.herokuapp.com/cartoes/salvar',
        method: 'POST',
        data: mural,
        success: function(res) {
          $('#sync').addClass('botaoSync--sincronizado');
          console.log(res.quantidade + 'cartões salvos em + res.usuario');
        },
        error: function() {
          $('#sync').addClass('botaoSync--deuRuim');
          console.log('Não foi possivel salvar o mural');
        },
        complete: function() {
          $('#sync').removeClass('botaoSync--esperando')
        }
      });
    });
}) ()
