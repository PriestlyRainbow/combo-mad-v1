const bg = new Image();
bg.src = "cenario.jpg";

function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
}
Animacao.prototype = {
   // Serve para adicionar o sprite ao canvas
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },

   // Decide se a animação deve continuar ou não
   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },

   // Se não for continuar, é ativado.
   desligar: function() {
      this.ligado = false;
   },

   // Meio óbvio, limpa a tela, mas pode ser utilizado para renderizar o cenário também
   limparTela: function() {
      var ctx = this.context;
      ctx.fillStyle = "#7ba7a6";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.context.drawImage(bg, 0, 321, 800, 479);
   },

   // !! PASSOS DE RENDERIZAÇÃO !!

   proximoFrame: function() {
      // Checa se pode renderizar o próximo frame
      if ( ! this.ligado ) return;

      // Limpa a tela ou renderiza o cenário
      this.limparTela();
 
      /* Atualizamos o estado dos sprites.
         Lembrete que se não funcionar,
         o próprio sprite deve haver a
         função de "atualizar". */
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      /* Desenhamos os sprites.
         Também é necessário a
         função de "desenhar" em
         cada sprite. */
      for (var i in this.sprites)
         this.sprites[i].desenhar();

      // Chamamos o próximo ciclo
      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   }
   
}